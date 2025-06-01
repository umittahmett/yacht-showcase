import { columns, Product } from "@/components/table/products-table/columns"
import { DataTable } from "@/components/table/products-table/data-table"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/server"
import { Plus } from "lucide-react"
import Link from "next/link"

async function getData(): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const {data: productsData, error: productsError} = await supabase.from('products')
      .select('*')
    if (productsError) {
      console.error("Error fetching products:", productsError)
      return []
    }

    const {data: baseInformationData, error: baseInformationError} = 
      await supabase.from('base_informations')
      .select('*')

    const {data: productBaseInformationData, error: productBaseInformationError} = 
      await supabase.from('product_base_informations')
      .select('*')

    if (baseInformationError || productBaseInformationError) {
      console.error("Error fetching base information:", baseInformationError || productBaseInformationError)
      return []
    }

    productsData.forEach(product => {
      product.base_informations = productBaseInformationData
        .filter(pbi => pbi.product_id === product.id)
        .map(pbi => {
          const baseInfo = baseInformationData.find(bi => bi.id === pbi.feature_id)
          return {
            ...baseInfo,
            language_code: baseInfo.language_code || 'global',
            value: pbi.value
          }
        })
        .filter(bi => bi.field_name === "name")
    })

    console.log("Fetched products data:", productsData);
    
    return productsData
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export default async function Products() {
  const data = await getData()

  return (
    <div className="container mx-auto pb-10">
      <div className="ml-auto w-fit my-5">
          <Link href="/dashboard/product" >
            <Button>
                Create
              <Plus />
            </Button>
          </Link>
      </div>
      
      <DataTable columns={columns} data={data} />
    </div>
  )
}