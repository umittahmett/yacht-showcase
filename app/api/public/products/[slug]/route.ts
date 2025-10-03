import { transformPricingData } from '@/utils/server/transform-pricing-data';
import { transformProductFeatures } from '@/utils/server/transform-product-features';
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

const featureGroups = [
  "base_informations",
  "general_features",
  "cabin_details",
  "services",
  "technical_specifications",
  "water_sports",
];

/**
 * Get Product
 * http://app-url.com/api/public/products/[slug]
 */
export async function GET(request: Request,{ params }: { params: { slug: string } }) {
  const { slug } = await params

  if (!slug) {
    return NextResponse.json({ error: 'Missing or invalid slug' }, { status: 400 })
  }

  try {
    const supabase = await createClient()
    
    const {data:productData, error:productError} = await supabase.from('products')
    .select(`
      *,
      product_pricing(*,
        pricing_types(*, pricing_types_translations(*)),
        pricing_periods(*, pricing_periods_translations(*))
      ),
      ${featureGroups.map((group) => `product_${group}(
        *,
        ${group}(*, ${group}_translations(*))
      )`).join(',')}
    `)
    .eq('id', slug)
    .single()

    if (productError) {
      return NextResponse.json({ error: 'Unexpected error', message: productError }, { status: 500 })
    }

    const { product_pricing, ...rest }:any = productData;
    const transformedProduct = transformProductFeatures(rest, 'en');
    const transformedPricing = transformPricingData(product_pricing);
    
    const baseInfo = transformedProduct.features.find((f: any) => f.name === 'base_informations');
    const title = baseInfo?.fields.find((f: any) => f.field_name === 'name')?.value;
    
    const data = {
      title,
      ...transformedProduct,
      features: transformedProduct.features.map((feature: any) => 
        feature.name === 'base_informations'
          ? { ...feature, fields: feature.fields.filter((f: any) => f.field_name !== 'name') }
          : feature
      ),
      pricing: transformedPricing
    };
    
    return NextResponse.json(data , { status: 200 })

  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error', message: String(e) }, { status: 500 })
  }
}