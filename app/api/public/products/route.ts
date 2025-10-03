import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { generateFilters } from '@/utils/server/generate-filters';

/**
 * Get Products
 * http://app-url.com/api/products
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')

  try {
    const supabase = await createClient()
    let baseInformationsQuery = supabase
      .from('product_base_informations')
      .select('*')

    if (q) {
      baseInformationsQuery = baseInformationsQuery.or(`value.ilike.%${q}%`) 
    }

    const { data: baseInformations, error: baseInformationsError } = await baseInformationsQuery

    if (baseInformationsError) {
      throw new Error(baseInformationsError.message)
    }    

    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .in('id', [...new Set(baseInformations)].map((bi: any) => bi.product_id) ?? [])

    if (productsError || !products?.length) {
      throw new Error(productsError?.message ?? 'No pure products found')
    }

    const [
      { data: baseInfos },
      { data: technicalInfos },
      { data: pricingTypes },
    ] = await Promise.all([
      supabase.from('base_informations').select('*'),
      supabase.from('technical_specifications').select('*'),
      supabase.from('pricing_types').select('*'),
    ])

    const dailyTypeId: number | undefined = pricingTypes?.find(
      (pt: any) => String(pt?.field_name ?? '').toLowerCase() === 'daily_prices'
    )?.id

    const data = await Promise.all(
      products.map(async (p: any) => {
        const [{ data: pbi }, { data: pts }, { data: ptr }] = await Promise.all([
          supabase
            .from('product_base_informations')
            .select('*')
            .eq('product_id', p.id),
          supabase
            .from('product_technical_specifications')
            .select('*')
            .eq('product_id', p.id),
          supabase
            .from('product_pricing')
            .select('*')
            .eq('product_id', p.id),
        ])

        const fields: Record<string, string> = {}

        pbi?.forEach((row: any) => {
          const def = baseInfos?.find((f: any) => f.id === row.feature_id)
          if (def?.field_name) fields[def.field_name] = row.value
        })

        pts?.forEach((row: any) => {
          const def = technicalInfos?.find((f: any) => f.id === row.feature_id)
          if (def?.field_name) fields[def.field_name] = row.value
        })

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

        return { ...p, ...fields, daily_price: dailyPrice }
      })
    )

    const filters = generateFilters(data)
    
    return NextResponse.json({ data, filters }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch products', message: (e as Error)?.message ?? 'Unknown error' }, { status: 500 })
  }
}