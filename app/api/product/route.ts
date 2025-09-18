import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { Group, GroupField, PricingFeatureField, PricingType, ProductFeature, ProductFeatureField } from '@/types/product'
import { getProductData } from '@/app/dashboard/product/actions'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('id')

  if (!productId || Number.isNaN(productId)) {
    return NextResponse.json({ error: 'Missing or invalid id' }, { status: 400 })
  }

  try {
    let productData: any = null;

    const supabase = await createClient();  
    productData = await getProductData(Number(productId))
    
    const {data: features, error: featuresError} = await supabase.from(`features_translations`).select("id, feature_name, name, language_code").eq("language_code", "en")

    if (featuresError) {
      throw new Error('Error fetching features');
    }

    let groups: any[] = (await Promise.all(
      features.map(async (feature) => {
        const { data, error } = await supabase.from(feature.feature_name!).select(`
          id, 
          field_name, 
          ${feature.feature_name}_translations( name ) as translations
        `);

        if (error) {
          console.error("Error fetching fields:", error);
          return [];
        }

        return {
          name: feature.feature_name,
          title: feature.name,
          fields: data.map((field: any) => { 
            return { 
              id: field.id,
              name: field.field_name,
              title: field[`${feature.feature_name}_translations`][0]?.name ?? field.field_name,
              value: field.value
            } 
          }),
        };
      })
    )) as any[];

    const { data: pricingPeriods, error: pricingPeriodsError } = await supabase.from('pricing_periods').select(`
      id, 
      field_name,
      pricing_periods_translations( name, language_code ) 
    `).eq('pricing_periods_translations.language_code', 'en')

    const { data: pricingTypes, error: pricingTypesError } = await supabase.from('pricing_types').select(`
      id, 
      field_name,
      pricing_types_translations( name, language_code ) 
    `).eq('pricing_types_translations.language_code', 'en');

    if (pricingPeriodsError || pricingTypesError) { throw new Error('Error fetching pricing data') }

    let pricingData: Group[] | any = pricingTypes.map((pricingType: PricingType) => {
      return {
        id: pricingType.id,
        name: pricingType.field_name,
        title: pricingType.pricing_types_translations?.[0]?.name ?? pricingType.field_name,
        fields: pricingPeriods
      }
    })

    if (productData) {
      groups = groups.map((group: Group) => {
        const groupFeatures = productData.features.find((feature: ProductFeature) => feature.name === group.name);
        return {
          ...group,
          fields: group.fields.map((field: GroupField) => {
            const feature = groupFeatures?.fields.find((feature: ProductFeatureField) => feature.feature_id === field.id);
            return {
              ...field,
              value: feature?.value,
            };
          }),
        };
      });
    }

    if (productData) {
      const pricingFeature = productData.features.find((feature: ProductFeature) => feature.name === 'pricing');

      if (pricingFeature) {
        const pricingFeatures: PricingFeatureField[] | any = pricingFeature.fields;

        pricingData = pricingData.map((pricingType: Group) => {
          const pricingTypeData: PricingFeatureField[] | any = pricingFeatures.filter((field: PricingFeatureField) => field.pricing_type_id === pricingType.id);
          return {
            name: pricingType.name,
            title: pricingType.title,
            fields: pricingType.fields.map((field) => {
              const pricingPeriod = pricingTypeData.find((period: PricingFeatureField) => period.pricing_period_id === field.id);
              return {
                title: field.pricing_periods_translations?.[0]?.name || field.field_name,
                value: pricingPeriod?.value,
              }
            }),
          }
        });
      }
    }

    const data = {
      id: productId,
      title: groups.find((group: Group) => group.name === 'base_informations').fields.find((field: GroupField) => field.name === 'name').value,
      images: productData.images,
      status: productData.status,
      created_at: productData.created_at,
      features: groups.map((group: Group) => {
        if (group.name === 'base_informations') {
          return {
            ...group,
            fields: group.fields.filter((field: GroupField) => field.name !== 'name')
          };
        }
        return group;
      }),
      pricing: pricingData
    }

    return NextResponse.json(data, { status: 200 })

  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error', message: String(e) }, { status: 500 })
  }
}