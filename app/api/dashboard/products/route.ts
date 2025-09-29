import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

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
