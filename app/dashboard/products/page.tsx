import { columns, Product } from "@/components/table/products-table/columns"
import { DataTable } from "@/components/table/products-table/data-table"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/server"
import { Plus } from "lucide-react"
import Link from "next/link"



async function getData(): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const {data, error} = await supabase.from('products')
      .select('*')
    if (error) {
      console.error("Error fetching products:", error)
      return []
    }

    return data
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export default async function Products() {
  const data = await getData()

  return (
    <div className="container mx-auto pb-10">
      <div className="ml-auto w-fit  my-5">
        <Button>
          <Link href="/dashboard/product" >
            Create
          </Link>
          <Plus />
        </Button>
      </div>
      
      <DataTable columns={columns} data={data} />
    </div>
  )
}