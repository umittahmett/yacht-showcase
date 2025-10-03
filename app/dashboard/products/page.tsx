import { columns } from "@/components/table/products-table/columns"
import { DataTable } from "@/components/table/products-table/data-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function Products() {

  let data;
  const apiKey = process.env.NEXT_API_KEY;

  try {
    if (!apiKey) {
      throw new Error('API key not found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/dashboard/products`,{
      headers:{
        'api-key': apiKey
      }
    })
    
    const responseData = await response.json()
    data = responseData.data || []

  } catch (error) {
    console.error("Error fetching products:", error)
    data = []
  }

  return (
    <div className="container mx-auto pb-10">
      <div className="flex items-center justify-between w-full my-5">
        <h1 className="section-title">Products</h1>
          <Link href="/dashboard/products/new" >
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