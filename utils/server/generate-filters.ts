import { FilterItem } from "@/types"

export const generateFilters = (products: any[]) => {
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