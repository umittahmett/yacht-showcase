'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const apiKey = process.env.NEXT_API_KEY

export async function createProduct(formData: FormData) {  
  try {
    if (!apiKey) {
      throw new Error('Missing required fields');
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/dashboard/products`,
      {
        method: 'POST',
        headers: { 'api-key': apiKey },
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) { 
      throw new Error(result.error || 'Failed to create product');
    }
    
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }

  redirect('/dashboard/products')
}

export async function getProductData(slug: string) {
  try {
    if (!apiKey) {
      throw new Error('API key not found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/dashboard/products/${slug}`,{
      headers:{
        'api-key': apiKey
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch product data');
    }

    const responseJson = await response.json()
    
    return responseJson.data

  } catch (error) {
    console.error("Error fetching product:", error)
    throw error
  }

}

export async function deleteProducts(ids: (number | string)[], redirectTo?: string) {
  try {    
    if (!ids || !apiKey) {
      throw new Error('Missing required fields');
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/dashboard/products`,
      {
        method: 'DELETE',
        headers: { 'api-key': apiKey },
        body: JSON.stringify({ids: ids}),
      }
    );

    const result = await response.json();

    if (!response.ok) { 
      throw new Error(result.error || 'Failed to delete product(s)');
    }
    
  } catch (error) {
    console.error('Error deleting product(s):', error);
    throw error;
  }

  if (redirectTo) {
    redirect(redirectTo);
  } else {
    revalidatePath('/dashboard/products');
  }
}

export async function updateProduct(formData: FormData) {
  try {
    const productId = formData.get('product_id') as string;
    
    if (!productId || !apiKey) {
      throw new Error('Missing required fields');
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/dashboard/products/${productId}`,
      {
        method: 'PUT',
        headers: { 'api-key': apiKey },
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) { 
      throw new Error(result.error || 'Failed to update product');
    }

    revalidatePath('/dashboard/products');
    
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
  
  redirect('/dashboard/products');
}