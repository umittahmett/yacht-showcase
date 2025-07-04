'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import path from 'path'
import { mkdir, writeFile } from 'fs/promises'

const productFeatureGroups = [
  { product_feature_name: "product_pricing", group_name: "pricing" },
  { product_feature_name: "product_base_informations", group_name: "base_informations" },
  { product_feature_name: "product_general_features", group_name: "general_features" },
  { product_feature_name: "product_cabin_details", group_name: "cabin_details" },
  { product_feature_name: "product_services", group_name: "services" },
  { product_feature_name: "product_technical_specifications", group_name: "technical_specifications" },
  { product_feature_name: "product_water_sports", group_name: "water_sports" },
];

export async function createProduct(formData: any) {
  const supabase = await createClient()
  const features = JSON.parse(formData.get('features'))
  const images = formData.getAll('images') as File[]
  let imageUrls: string[] = []
  const rawLang = formData.get('language')
  const language = typeof rawLang === 'string' ? rawLang.replace(/^"|"$/g, '') : null

  interface Product{
    id: number;
    image: string[];
    created_at: string;
  }

  const { data, error } = await supabase
    .from('products')
    .insert({})
    .select() as { data: Product[], error: any }

  if (error) {
    throw new Error('Error creating product: ' + error.message)
  }

  const newProductId = data[0].id;

  if (images && images.length > 0) {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'products')

    try {
      await mkdir(uploadsDir, { recursive: true })
    } catch (err) {
      console.log('Directory already exists or creation failed:', err)
    }

    const uploadPromises = images.map(async (file, index) => {
      const fileExt = file.name.split('.').pop()
      const fileName = `${newProductId}-${Date.now()}-${index}.${fileExt}`
      const filePath = path.join(uploadsDir, fileName)

      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      await writeFile(filePath, buffer)

      const publicUrl = `/uploads/products/${fileName}`

      return publicUrl
    })

    try {
      imageUrls = await Promise.all(uploadPromises)
    } catch (uploadErr) {
      throw new Error('Image upload error: ' + uploadErr)
    }
  }

  if (imageUrls.length > 0) {
    const { error: updateError } = await supabase
      .from('products')
      .update({ images: imageUrls })
      .eq('id', newProductId)

    if (updateError) {
      throw new Error('Error updating product with images: ' + updateError.message)
    }
  }

  const insertTasks = features.map((feature: any) => {

    if((feature.group_name.endsWith('_prices'))){

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
            throw new Error(`Error inserting features for group ${feature.group_name}: ` + error.message);
          }
        });

    }

    else {
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
            throw new Error(`Error inserting features for group ${feature.group_name}: ` + error.message);
          }
        });
    }
  });


  try {
    await Promise.all(insertTasks);
  } catch (err) {
    throw new Error('Feature insert error: ' + err);
  }

  redirect('/dashboard/products')
}

export async function getProductData(productId: number) {

  const supabase = await createClient()

  const { data:productData , error:productDataError } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single()

  if (productDataError) {
    console.error("Error fetching product data:", productDataError);
  }

  const productFeatures = (await Promise.all(
    productFeatureGroups.map(async ({ product_feature_name, group_name }) => {
      const { data, error } = await supabase.from(product_feature_name).select("*").eq('product_id', productId);

      if (error) {
        console.error("Error fetching fields:", error);
        return [];
      }
      return {
        name: group_name,
        product_feature_name: product_feature_name,
        fields: data,
      };
    })
  ))

  const product = {
    id: productId,
    images: productData.images,
    status: productData.status,
    created_at: productData.created_at,
    features: productFeatures,
  }

  return product;
}