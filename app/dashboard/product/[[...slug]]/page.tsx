import { DynamicForm } from "@/components/form/dynamic-product-form";
import { PricingType, FeatureTranslation, Group, GroupTranslation, Language, GroupField, GroupTranslationField, ProductFeature, ProductFeatureField, PricingFeatureField } from "@/types/product";
import { createClient } from "@/utils/supabase/server";
import { error } from "console";
import { redirect } from "next/navigation";
import { getProductData } from "../actions";

export default async function ProductFormWrapper({
  params,
}: {
  params: Promise<{ slug?: string }>
}) {
  const { slug } = await params;

  if (!slug) { redirect('/dashboard/product/new') }

  let productData:any = null;

  if (slug && slug != 'new'){
    productData = await getProductData(Number(slug))
  }

  const supabase = await createClient();
  const groupNames = [
    "base_informations",
    "general_features",
    "cabin_details",
    "services",
    "technical_specifications",
    "water_sports",
  ];

  const groups:Group[] = (await Promise.all(
    groupNames.map(async (groupName) => {
      const { data, error } = await supabase.from(groupName).select("*");

      if (error) {
        console.error("Error fetching fields:", error);
        return [];
      }
      return {
        title: groupName,
        fields: data,
      };
    })
  )) as Group[];

  const groupsTranslations:GroupTranslation[] = (await Promise.all(
    groupNames.map(async (groupName) => {
      const {data, error} = await supabase.from(`${groupName}_translations`).select("*");

      if (error) {
        console.error("Error fetching fields:", error);
        return [];
      }
      return {
        title: groupName,
        fields: data,
      };
    })
  )) as GroupTranslation[];

  const featuresTranslations:FeatureTranslation[] = await
  supabase.from(`features_translations`).select("*").then(response => {
    if (response.error) {
      console.error("Error fetching fields:", error);
      return [];
    }
    return response.data;
  })

  const languages:Language[] = await
  supabase.from(`languages`).select("*").then(response => {
    if (response.error) {
      console.error("Error fetching fields:", error);
      return [];
    }
    return response.data;
  })

  let translatedGroups:Group[] = groups.map((group: Group) => {
    const translationGroup = groupsTranslations.find(
      (transGroup) => (transGroup as GroupTranslation).title === group.title
    ) as GroupTranslation | undefined;

    const translatedGroup = featuresTranslations?.find(
      (transGroup: FeatureTranslation) =>
        transGroup.feature_name === group.title && transGroup.language_code === "en"
    ) as FeatureTranslation | undefined;

    return {
      id: group.id,
      name: group.title,
      title: translatedGroup?.name ?? group.title,
      group_language_code: translatedGroup?.language_code ?? null,
      fields: group.fields.map((field: GroupField) => {
        const translationField =(
          translationGroup && translationGroup.fields
            ? translationGroup.fields.find(
                (transField) =>{
                  return (transField as GroupTranslationField).feature_id === field.id && transField.language_code === "en"
                }
              )
            : null) as GroupTranslationField | undefined;

        return {
          ...field,
          field_title: translationField ? translationField.name : field.field_name,
          field_language_code: translationField ? translationField.language_code : null,
        };
      }),
    };
  }) as Group[];

  const {data:pricingPeriods, error:pricingPeriodsError} = await supabase.from('pricing_periods').select("*");
  const {data:pricingTypes, error:pricingTypesError} = await supabase.from('pricing_types').select("*");
  const {data:pricingTypesTranslations, error:pricingTypesTranslationsError} = await supabase.from('pricing_types_translations').select("*");
  const {data:pricingPeriodsTranslations, error:pricingPeriodsTranslationsError} = await supabase.from('pricing_periods_translations').select("*");

  if (pricingPeriodsTranslationsError || pricingPeriodsError || pricingTypesError || pricingTypesTranslationsError) {throw new Error('Error fetching pricing data')}

  const translatedPricingTypes = pricingTypes?.map((type: PricingType)=>{
    const translation: FeatureTranslation | any  = pricingTypesTranslations?.find((translatedType: FeatureTranslation)=> translatedType.feature_id == type.id && translatedType.language_code === 'en');
    if (!translation) {
      console.log('translation yok');
    }

    return {
      ...type,
      name: translation ? translation?.name : type.field_name,
      language_code: translation ? translation?.language_code : 'global',
    };
  })

  const translatedPricingPeriods = pricingPeriods?.map((type: PricingType)=>{
    const translation: FeatureTranslation | any  = pricingPeriodsTranslations?.find((translatedPeriod: FeatureTranslation)=> translatedPeriod.feature_id == type.id && translatedPeriod.language_code === 'en');
    if (!translation) {
      console.log('translation yok');
    }

    return {
      ...type,
      field_title: translation ? translation?.name : type.field_name,
      field_language_code: translation ? translation?.language_code : 'global',
    };
  })

  let pricingData:Group[] | any = translatedPricingTypes.map((pricingType:PricingType)=> {
    return {
      id: pricingType.id,
      name: pricingType.field_name,
      title: pricingType.name ?? pricingType.field_name,
      group_language_code: pricingType?.language_code ?? 'global',
      fields: [...translatedPricingPeriods]
    }
  })

  if (slug && productData) {
    translatedGroups = translatedGroups.map((group: Group) => {
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

  if (slug && productData) {
    const pricingFeature = productData.features.find((feature: ProductFeature) => feature.name === 'pricing');
    
    if (pricingFeature) {
      const pricingFeatures:PricingFeatureField[] | any = pricingFeature.fields;
      
      pricingData = pricingData.map((pricingType: Group) => {
        const pricingTypeData:PricingFeatureField[] | any = pricingFeatures.filter((field: PricingFeatureField) => field.pricing_type_id === pricingType.id);
        console.log('pricingTypeData for', pricingType.id, ':', pricingTypeData);
        return {
          ...pricingType,
          fields: pricingType.fields.map((field)=>{
            const pricingPeriod = pricingTypeData.find((period: PricingFeatureField) => period.pricing_period_id === field.id);
            return {
              ...field,
              value: pricingPeriod?.value,
            }
          }),
        }
      });
    }
  }
  translatedGroups.push(...pricingData);

  console.log('pricingData:', pricingData);
  console.log('product:', productData);

  return <DynamicForm languages={languages} groups={translatedGroups} />;
}
