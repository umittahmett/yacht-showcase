'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import path from 'path'
import { mkdir, writeFile } from 'fs/promises'

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
        console.log(`Features for group ${feature.group_name} inserted successfully.`);
      });
  });

  try {
    await Promise.all(insertTasks);
  } catch (err) {
    throw new Error('Feature insert error: ' + err);
  }
  
  redirect('/dashboard/products')
}