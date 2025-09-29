import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { FilterItem } from '@/types';

/**
 * Get Products
 * http://app-url.com/api/products
 */
export async function GET(request: Request) {
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

const generateFilters = (products: any[]) => {
  const items: FilterItem[] = []

  // Helper function to create range-based filters
  const createRangeFilter = (id: string, label: string, values: number[], itemsSuffix?: string) => {
    const validValues = values.filter(v => !isNaN(v) && v > 0)
    if (validValues.length === 0) return null

    const min = Math.min(...validValues)
    const max = Math.max(...validValues)
    const range = max - min
    const step = Math.ceil(range / 5) // Create 5 ranges

    const ranges = []
    for (let i = 0; i < 5; i++) {
      const rangeMin = min + (i * step)
      const rangeMax = i === 4 ? max : min + ((i + 1) * step)
      const rangeId = `${rangeMin} ${itemsSuffix ?? ''} - ${rangeMax} ${itemsSuffix ?? ''}`
      const rangeValue = `${rangeMin}-${rangeMax}`
      ranges.push({
        id: rangeId,
        label: rangeId,
        value: rangeValue
      })
    }

    return {
      id,
      label,
      type: 'checkbox' as const,
      items: ranges,
    }
  }
  // Capacity filter (range-based)
  const capacityValues = products.map((p: any) => parseFloat(p.capacity)).filter(v => !isNaN(v))
  const capacityFilter = createRangeFilter('capacity', 'Capacity', capacityValues, 'per')
  if (capacityFilter) items.push(capacityFilter)

  // Personnel filter (range-based)
  const personnelValues = products.map((p: any) => parseFloat(p.personnel)).filter(v => !isNaN(v))
  const personnelFilter = createRangeFilter('personnel', 'Personnel', personnelValues, 'per')
  if (personnelFilter) items.push(personnelFilter)

  // Width filter (range-based)
  const widthValues = products.map((p: any) => parseFloat(p.width)).filter(v => !isNaN(v))
  const widthFilter = createRangeFilter('width', 'Width', widthValues, 'm')
  if (widthFilter) items.push(widthFilter)

  // Height filter (range-based)
  const heightValues = products.map((p: any) => parseFloat(p.height)).filter(v => !isNaN(v))
  const heightFilter = createRangeFilter('height', 'Height', heightValues, 'm')
  if (heightFilter) items.push(heightFilter)

  // Price filter (special range type with min/max)
  const priceValues = products.map((p: any) => p.daily_price).filter(v => v != null && !isNaN(v) && v > 0)
  if (priceValues.length > 0) {
    items.push({
      id: 'price-range',
      label: 'Price range',
      type: 'range',
      items: {
        min: Math.min(...priceValues),
        max: Math.max(...priceValues)
      }
    })
  }

  return items
}