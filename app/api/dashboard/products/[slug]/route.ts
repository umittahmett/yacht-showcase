import { featureGroups } from '@/lib/constants/server';
import { deleteImages } from '@/utils/server/delete-images';
import { transformPricingData } from '@/utils/server/transform-pricing-data';
import { transformProductFeatures } from '@/utils/server/transform-product-features';
import { uploadImages } from '@/utils/server/upload-images';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server'

/**
 * Get Product or Feature Fields
 * http://app-url.com/api/dashboard/products/[slug]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
)  {
  const { slug } = await params;
  
  if (!slug) {
    return NextResponse.json({ error: 'Missing or invalid slug' }, { status: 400 })
  }

  try {
    const supabase = await createClient();

    if(slug == 'new'){
      const {data: pricingTypes, error: pricingTypesError} = await supabase
        .from('pricing_types')
        .select('*, pricing_types_translations(*)');
        
      const {data: pricingPeriods, error: pricingPeriodsError} = await supabase
        .from('pricing_periods')
        .select('*, pricing_periods_translations(*)');
    
      if (pricingTypesError) throw pricingTypesError;
      if (pricingPeriodsError) throw pricingPeriodsError;

      const results = await Promise.all(
        featureGroups.map(async (feature) => {
          const { data, error } = await supabase
            .from(feature)
            .select(`*, ${feature}_translations(*)`);

            if (error) {
              throw error.message;
            }
          
          return {
            name: feature,
            title: feature,
            fields: data.map((field:any)=>{
              const keyToRemove = `${feature}_translations`;
              const {[keyToRemove]: featureTranslation, ...rest}:any = field;
              return {
                ...rest,
                field_title: featureTranslation[0].name || field.field_name,
              };
            }),
            
          }
          
        })
      );
    
      const pricingGroups = pricingTypes?.map(type => {
        const translation = type.pricing_types_translations?.[0];
    
        const fields = pricingPeriods?.map(period => {
          const periodTranslation = period.pricing_periods_translations?.[0];
          const { pricing_periods_translations, ...restPeriod } = period; // eslint-disable-line @typescript-eslint/no-unused-vars
          
          return {
            ...restPeriod,
            field_title: periodTranslation?.name || period.field_name,
            field_language_code: periodTranslation?.language_code || 'en'
          };
        }) || [];
    
        return {
          id: type.id,
          name: type.field_name,
          title: translation?.name || type.field_name,
          group_language_code: translation?.language_code || 'en',
          fields
        };
      }) || [];
    
      return NextResponse.json({data:{features:[...results, ...pricingGroups]}}, { status: 200 });
    }
    
    const {data:productData, error:productError} = await supabase.from('products')
    .select(`
      *,
      product_pricing(*,
        pricing_types(*, pricing_types_translations(*)),
        pricing_periods(*, pricing_periods_translations(*))
      ),
      ${featureGroups.map((group:string) => `product_${group}(
        *,
        ${group}(*, ${group}_translations(*))
      )`).join(',')}
    `)
    .eq('id', Number(slug))
    .single()

    if (productError) {
      return NextResponse.json({ error: 'Unexpected error', message: productError }, { status: 500 })
    }

    const { product_pricing, ...rest }:any = productData;
    const transformedProduct = transformProductFeatures(rest, 'en');
    const transformedPricing = transformPricingData(product_pricing);
    transformedProduct.features = [
      ...transformedProduct.features,
      ...transformedPricing
    ];
    const data = transformedProduct;
    
    return NextResponse.json({ data: data }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error: 'Unexpected error', message: String(error) }, { status: 500 })
  }
}

/**
 * Update Product
 * http://app-url.com/api/dashboard/products/[slug]
 * body : { data: product data }
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params

  if (!slug) {
    return NextResponse.json({ error: 'Missing or invalid slug' }, { status: 400 })
  }

  try {
    const supabase = await createClient()
    const formData = await request.formData();

    const features = JSON.parse(formData.get('features') as string);
    const imagesToDelete = formData.has('images_to_delete') ? JSON.parse(formData.get('images_to_delete') as string) : null;
    const newImages = formData.getAll('images') as File[];
    const updatedImages: string[] = []
    const newImageUrls: string[] | undefined = newImages ? await uploadImages(newImages, Number(slug)) : []

    // Check if product exists and get current images
    const { data: existingProduct, error: fetchError } = await supabase
    .from('products')
    .select('id, images')
    .eq('id', Number(slug))
    .single()

    console.log('features:', JSON.stringify(features, null, 2))

    if (fetchError || !existingProduct) {
      return NextResponse.json({success:true, message: 'Product not found'}, { status:404 })
    }

    if (imagesToDelete) {
      await deleteImages(imagesToDelete);
    }

    if (newImageUrls && newImageUrls.length > 0) {
      updatedImages.push(...newImageUrls)
    }

    const remainingImages = existingProduct.images.filter((image:string) => !imagesToDelete?.includes(image))
    updatedImages.push(...remainingImages)

    if (newImageUrls && newImageUrls.length > 0 || imagesToDelete && imagesToDelete.length > 0) {
      const { error: updateError } = await supabase
        .from('products')
        .update({ images: updatedImages })
        .eq('id', Number(slug))

      if (updateError) {
        return NextResponse.json({success:true, message: 'Error updating product with images'}, { status:500 })
      }
    }

    const insertTasks = features.map((feature: any) => {
      if((feature.group_name.endsWith('_prices'))){
        const updatePromises = feature.fields.map((field: any) => 
          supabase
            .from('product_pricing')
            .update({ value: field.value })
            .eq('product_id', Number(slug))
            .eq('pricing_type_id', feature.id)
            .eq('pricing_period_id', field.id)
            .select()
            .then((results) => {
              console.log("PRICE UPDATE ERROR:", results.error);
            })
        )

        return Promise.all(updatePromises)
          .then((results) => {
            results.forEach((result, index) => {
              if (result && result.error) {
                throw new Error(`Error updating feature for field ${feature.fields[index].id}: ${result.error.message}`);
              }
            });
          });
      }

      else {
        const updatePromises = feature.fields.map((field: any) => 
          supabase
            .from(`product_${feature.group_name}`)
            .update({ value: field.value })
            .eq('product_id', Number(slug))
            .eq('feature_id', field.id)
            .select()
            .then((results) => {
              console.log("ERROR:", results.error);
            })
        );

        return Promise.all(updatePromises)
          .then((results) => {
            results.forEach((result, index) => {
              if (result && result.error) {
                throw new Error(`Error updating feature for field ${feature.fields[index].id}: ${result.error.message}`);
              }
            });
          });
      }
    });

    await Promise.all(insertTasks);

    return NextResponse.json({success:true, message: 'Product updated'}, {status:200})

  } catch (error) {
    return NextResponse.json({ error: 'Unexpected error', message: String(error) }, { status: 500 })
  }
}