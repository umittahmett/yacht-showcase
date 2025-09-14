import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const idParam = url.searchParams.get('id')
  const productId = idParam ? Number(idParam) : undefined

  if (!productId || Number.isNaN(productId)) {
    return NextResponse.json({ error: 'Missing or invalid id' }, { status: 400 })
  }

  try {
    const supabase = await createClient()

    // Fetch base product
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const [
      { data: baseInfos },
      { data: technicalInfos },
      { data: generalInfos },
      { data: cabinInfos },
      { data: servicesInfos },
      { data: waterSportsInfos },
      { data: pricingTypes },
    ] = await Promise.all([
      supabase.from('base_informations').select('*'),
      supabase.from('technical_specifications').select('*'),
      supabase.from('general_features').select('*'),
      supabase.from('cabin_details').select('*'),
      supabase.from('services').select('*'),
      supabase.from('water_sports').select('*'),
      supabase.from('pricing_types').select('*'),
    ])

    // Find daily pricing type
    const dailyTypeId: number | undefined = pricingTypes?.find(
      (pt: any) => String(pt?.field_name ?? '').toLowerCase() === 'daily_prices'
    )?.id

    // Product feature rows
    const [
      { data: pbi },
      { data: pts },
      { data: pgs },
      { data: pcd },
      { data: psr },
      { data: pws },
      { data: ptr },
    ] = await Promise.all([
      supabase
        .from('product_base_informations')
        .select('*')
        .eq('product_id', productId),
      supabase
        .from('product_technical_specifications')
        .select('*')
        .eq('product_id', productId),
      supabase
        .from('product_general_features')
        .select('*')
        .eq('product_id', productId),
      supabase
        .from('product_cabin_details')
        .select('*')
        .eq('product_id', productId),
      supabase
        .from('product_services')
        .select('*')
        .eq('product_id', productId),
      supabase
        .from('product_water_sports')
        .select('*')
        .eq('product_id', productId),
      supabase
        .from('product_pricing')
        .select('*')
        .eq('product_id', productId),
    ])

    // Merge fields by definition field_name into group buckets
    const base_informations: Record<string, any> = {}
    const technical_specifications: Record<string, any> = {}
    const general_features: Record<string, any> = {}
    const cabin_details: Record<string, any> = {}
    const services: Record<string, any> = {}
    const water_sports: Record<string, any> = {}

    pbi?.forEach((row: any) => {
      const def = baseInfos?.find((f: any) => f.id === row.feature_id)
      if (def?.field_name) base_informations[def.field_name] = row.value
    })
    
    pts?.forEach((row: any) => {
      const def = technicalInfos?.find((f: any) => f.id === row.feature_id)
      if (def?.field_name) technical_specifications[def.field_name] = row.value
    })

    pgs?.forEach((row: any) => {
      const def = generalInfos?.find((f: any) => f.id === row.feature_id)
      if (def?.field_name) general_features[def.field_name] = row.value
    })

    pcd?.forEach((row: any) => {
      const def = cabinInfos?.find((f: any) => f.id === row.feature_id)
      if (def?.field_name) cabin_details[def.field_name] = row.value
    })
    
    psr?.forEach((row: any) => {
      const def = servicesInfos?.find((f: any) => f.id === row.feature_id)
      if (def?.field_name) services[def.field_name] = row.value
    })
    
    pws?.forEach((row: any) => {
      const def = waterSportsInfos?.find((f: any) => f.id === row.feature_id)
      if (def?.field_name) water_sports[def.field_name] = row.value
    })
    
    // Compute daily price
    let dailyPrice: number | undefined = undefined
    if (ptr && dailyTypeId) {
      const dailyRows = ptr.filter((row: any) => row.pricing_type_id === dailyTypeId)
      if (dailyRows.length) {
        const values = dailyRows
          .map((r: any) => Number(r.value))
          .filter((v: any) => !Number.isNaN(v))
        if (values.length) dailyPrice = Math.min(...values)
      }
    }

    const image = Array.isArray(product.images) && product.images.length ? product.images[0] : undefined
    const data = {
      product: {
        id: product.id,
        images: product.images ?? [],
        coverImage: image,
        status: product.status,
        created_at: product.created_at,
        base_informations,
        technical_specifications,
        general_features,
        cabin_details,
        services,
        water_sports,
        pricing: {
          dailyPrice,
          rows: ptr ?? [],
        },
      },
    }
    
    return NextResponse.json({data}, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error', message: String(e) }, { status: 500 })
  }
}


