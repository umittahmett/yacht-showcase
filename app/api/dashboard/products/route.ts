import { deleteImages } from '@/utils/server/delete-images'
import { uploadImages } from '@/utils/server/upload-images';
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

const productFeatureGroups = [
  { product_feature_name: "product_pricing", group_name: "pricing" },
  { product_feature_name: "product_base_informations", group_name: "base_informations" },
  { product_feature_name: "product_general_features", group_name: "general_features" },
  { product_feature_name: "product_cabin_details", group_name: "cabin_details" },
  { product_feature_name: "product_services", group_name: "services" },
  { product_feature_name: "product_technical_specifications", group_name: "technical_specifications" },
  { product_feature_name: "product_water_sports", group_name: "water_sports" },
];

/**
 * Get Products
 * http://app-url.com/api/dashboard/products
 */
export async function GET() {
  try {
    const supabase = await createClient()
    const {data: productsData, error: productsError} = await supabase.from('products')
    .select(`
      id,
      images,
      status,
      created_at,
      product_base_informations(id, value, feature_id, language_code, created_at)
    `)

    if (productsError) {
      console.error("Error fetching products:", productsError)
      return NextResponse.json({ data: [], message: productsError }, { status: 500 })
    }

    return NextResponse.json({ data: productsData }, { status: 200 })
    
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ data: [],  message: error }, { status: 500 })
  }
}

/**
 * Get Products
 * http://app-url.com/api/dashboard/products
 */
export async function POST(request: Request) {
  const formData = await request.formData();
  
  console.log('formdataaaa', formData)
  

  if (!formData) {
    return NextResponse.json({ data: [], message: 'Invalid form data' }, { status: 400 })
  }

  try {
    const supabase = await createClient()
    const features = JSON.parse(formData.get('features') as string)
    const images = formData.getAll('images') as File[]
    let newImageUrls: string[] | undefined = []
    const language = 'en'

    interface Product{
      id: number;
      image: string[];
      created_at: string;
    }

    const { data, error } = await supabase
      .from('products')
      .insert({})
      .select().single() as { data: Product, error: any }
      
    if (error) {
      return NextResponse.json({ data: [], message: error }, { status: 500 })
    }

    const newProductId = data.id
    
    // save images
    if (images && images.length > 0) {
      newImageUrls = await uploadImages(images, newProductId)
      
      const { error: updateError } = await supabase
        .from('products')
        .update({ images: newImageUrls })
        .eq('id', newProductId)

      if (updateError) {
        return NextResponse.json({ data: [], message: `Error while adding product images: ${updateError}` }, { status: 500 })
      }
    }

    const insertTasks = features.map((feature: any) => {
      if(feature.group_name.endsWith('_prices')){
  
        const featureData = feature.fields.map((field: any) => ({
          product_id: newProductId,
          pricing_type_id: feature.id,
          pricing_period_id: field.id,
          value: field.value,
        }));
  
        return supabase
          .from(`product_pricing`)
          .insert(featureData)
          .select()
          .then(({ error }) => {
            if (error) {
              return NextResponse.json({ data: [], message: `Error while adding product pricing: ${error}` }, { status: 500 })
            }
          });
      }
      else{
        const featureData = feature.fields.map((field: any) => ({
          product_id: newProductId,
          feature_id: field.id,
          language_code: field.localizable && language ? language : 'global',
          value: field.value,
        }));

        return supabase
          .from(`product_${feature.group_name}`)
          .insert(featureData)
          .select()
          .then(({ error }) => {
            if (error) {
              return NextResponse.json({ data: [], message: `Error while adding product features: ${error}` }, { status: 500 })
            }
          });
      }
    })

    await Promise.all(insertTasks);
    
    return NextResponse.json({ data: {} }, { status: 200 })
    
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ data: [],  message: error }, { status: 500 })
  }
}

/**
 * Delete Products
 * http://app-url.com/api/dashboard/products
 * body : { ids:['1','2','3'] }
 */
export async function DELETE(request: Request) {
  const { ids } = await request.json();

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ data: [], message: 'Invalid product id(s)' }, { status: 400 })
  }

  try {
    const supabase = await createClient()
    const allImages: string[] = [];

    const { data: productsData, error: fetchError } = await supabase
      .from('products')
      .select('images')
      .in('id', ids);

    if (fetchError) {
      return NextResponse.json({ data: [], message: fetchError }, { status: 500 })
    } 

    productsData?.forEach(product => {
      if (product.images && Array.isArray(product.images)) {
        allImages.push(...product.images);
      }
    });

    if (allImages.length > 0) {
      try {
        await deleteImages(allImages);
      } 
      catch (imageDeleteError) {
        return NextResponse.json({ data: [], message: imageDeleteError }, { status: 500 })
      }
    }

    await Promise.all(
      productFeatureGroups.map(async (group) => {
        const { error: featuresError } = await supabase
          .from(`product_${group.group_name}`)
          .delete()
          .in('product_id', ids);
        
        if (featuresError) {
          return NextResponse.json({ data: [], message: featuresError }, { status: 500 })
        }
      })
    );

    const { error: deleteProductError } = await supabase
      .from('products')
      .delete()
      .in('id', ids);
    
    if (deleteProductError) {
      return NextResponse.json({ data: [], message: deleteProductError }, { status: 500 })
    }

    return NextResponse.json({ data: [], message: 'Products(s) deleted successfully' }, { status: 200 })
  } 
  catch (error) {
    return NextResponse.json({ data: [],  message: error }, { status: 500 })
  }
}