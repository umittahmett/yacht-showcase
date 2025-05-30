'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function createProduct(formData: any) {
  const supabase = await createClient()
  const features = JSON.parse(formData.get('features'))
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