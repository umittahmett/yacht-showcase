'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import path from 'path'
import { mkdir, writeFile, unlink } from 'fs/promises'

const productFeatureGroups = [
  { product_feature_name: "product_pricing", group_name: "pricing" },
  { product_feature_name: "product_base_informations", group_name: "base_informations" },
  { product_feature_name: "product_general_features", group_name: "general_features" },
  { product_feature_name: "product_cabin_details", group_name: "cabin_details" },
  { product_feature_name: "product_services", group_name: "services" },
  { product_feature_name: "product_technical_specifications", group_name: "technical_specifications" },
  { product_feature_name: "product_water_sports", group_name: "water_sports" },
];

export async function uploadImages(images:File[], productId:string|number) {
  if (images && images.length > 0) {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'products')

    try {
      await mkdir(uploadsDir, { recursive: true })
    } catch (err) {
      console.log('Directory already exists or creation failed:', err)
    }

    const uploadPromises = images.map(async (file, index) => {
      const fileExt = file.name.split('.').pop()
      const fileName = `${productId}-${Date.now()}-${index}.${fileExt}`
      const filePath = path.join(uploadsDir, fileName)

      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      await writeFile(filePath, buffer)
      const publicUrl = `/uploads/products/${fileName}`

      return publicUrl
    })

    try {
      const imageUrls = await Promise.all(uploadPromises)
      return imageUrls
    } catch (uploadErr) {
      throw new Error('Image upload error: ' + uploadErr)
    }
  }
} 

export async function createProduct(formData: any) {
  const supabase = await createClient()
  const features = JSON.parse(formData.get('features'))
  const images = formData.getAll('images') as File[]
  let imageUrls: string[] | undefined = []
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

  imageUrls = await uploadImages(images, newProductId)


  if (imageUrls && imageUrls.length > 0) {
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

export async function deleteImagesFromFolder(imageUrls: string[]) {
  try {
    const deletePromises = imageUrls.map(async (imageUrl) => {
      try {
        // URL'den direkt dosya yolunu oluştur
        const filePath = path.join(process.cwd(), 'public', imageUrl)
        await unlink(filePath)
        console.log(`Deleted image: ${imageUrl}`)
      } catch (err) {
        console.error(`Error deleting image ${imageUrl}:`, err)
        // Continue with other deletions even if one fails
      }
    })

    await Promise.all(deletePromises)
    console.log(`Successfully deleted ${imageUrls.length} images from folder`)
  } catch (error) {
    console.error('Error deleting images from folder:', error)
    throw new Error('Failed to delete images from folder: ' + error)
  }
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

export async function deleteProducts(productIds: (number | string)[], redirectTo?: string) {
  try {
    const supabase = await createClient()

    const { data: productsData, error: fetchError } = await supabase
      .from('products')
      .select('images')
      .in('id', productIds);

    if (fetchError) {
      console.error('Error fetching product images:', fetchError);
    } else {
      const allImages: string[] = [];
      productsData?.forEach(product => {
        if (product.images && Array.isArray(product.images)) {
          allImages.push(...product.images);
        }
      });

      if (allImages.length > 0) {
        try {
          await deleteImagesFromFolder(allImages);
        } catch (imageDeleteError) {
          console.error('Error deleting images from folder:', imageDeleteError);
        }
      }
    }

    await Promise.all(
      productFeatureGroups.map(async (group) => {
        const { data: featuresData, error: featuresError } = await supabase
          .from(`product_${group.group_name}`)
          .delete()
          .in('product_id', productIds);
        
        console.log(featuresData);
        
        if (featuresError) {
          console.error(`Error deleting features for group ${group.group_name}:`, featuresError);
        }
      })
    );

    // Delete all products
    const { error: deleteProductError } = await supabase
      .from('products')
      .delete()
      .in('id', productIds);
    
    if (deleteProductError) {
      console.error('Error deleting products:', deleteProductError);
      throw new Error('Error deleting products: ' + deleteProductError.message);
    }

    console.log(`Products ${productIds.join(', ')} deleted successfully`);
    
  } catch (error) {
    console.log(error);
    throw new Error('An error occurred while deleting products');
  }

  if (redirectTo) {
    redirect(redirectTo);
  } else {
    revalidatePath('/dashboard/products');
  }
}

export async function updateProduct(formData:any) {
  const supabase = await createClient()
  const productId = formData.get('product_id')
  const imagesToDelete:string[] = JSON.parse(formData.get('images_to_delete'))
  const newImages = formData.getAll('images') as File[] 
  const features = JSON.parse(formData.get('features'))

  try {
    // Check if product exists and get current images
    const { data: existingProduct, error: fetchError } = await supabase
      .from('products')
      .select('id, images')
      .eq('id', productId)
      .single()

    if (fetchError || !existingProduct) {
      throw new Error(`Product with ID ${productId} not found`)
    }

    // Update Images
    if (imagesToDelete) {
      await deleteImagesFromFolder(imagesToDelete);
    }
    const updatedImages: string[] = []
    const imageUrls: string[] | undefined = await uploadImages(newImages, productId)
    console.log('imageUrls:', imageUrls)
    if (imageUrls) {updatedImages.push(...imageUrls)}
    const remainingImages = existingProduct.images.filter((image:string) => 
      !imagesToDelete?.includes(image)
    )
    updatedImages.push(...remainingImages)

    if (imageUrls && imageUrls.length > 0 || imagesToDelete && imagesToDelete.length > 0) {
      const { error: updateError } = await supabase
        .from('products')
        .update({ images: updatedImages })
        .eq('id', productId)

      if (updateError) {
        throw new Error('Error updating product with images: ' + updateError.message)
      }
    }

    const insertTasks = features.map((feature: any) => {
      
      if((feature.group_name.endsWith('_prices'))){
        const updatePromises = feature.fields.map((field: any) => 
          supabase
            .from('product_pricing')
            .update({ value: field.value })
            .eq('product_id', productId)
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
            .eq('product_id', productId)
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
    
  } catch (error) {
    throw new Error(`An error occurred while updating product: ${error}`);
  }
  
  redirect('/dashboard/products')
}

