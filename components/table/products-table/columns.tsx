"use client"
import { ColumnDef } from "@tanstack/react-table"

export type Product = {
  id: number
  images: string[]
  product_base_informations?: {
    id: number
    field_name: string
    feature_id: number
    value: string
    language_code: string
  }[]
  status: "pending" | "processing" | "success" | "failed"
  created_at: string
}

import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import Image from "next/image"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { deleteProducts } from "@/app/dashboard/products/actions"

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: () => {
      return <span>ID</span>
    },
  },
  {
    id: "image",
    header: () => {
      return (
        <span>Image</span>
      )
    },
    cell: ({ row }) => {
      const product = row.original

      return (
        <Link href={`/dashboard/products/${product.id}`}>
          <Image  
            width={40}
            height={40}
            src={product.images && product.images[0] || "/placeholder-image.webp"}
            alt={`Product ${product.id}`}
            className="h-10 w-10 rounded object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-image.webp"
            }}
          />
        </Link>

      )
    },
  },
    {
    id: "name",
    header: () => {
      return (
        <span>Name</span>
      )
    },
    cell: ({ row }) => {
      const product = row.original
      const productName = product.product_base_informations?.find((base_info)=>{
        return base_info.feature_id === 3
      })?.value

      return <span className="truncate">{productName}</span>
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const product = row.original  
      return <span>{product.status ? 'published' : 'draft'}</span>
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    header: () => {
      return (
        <span>Actions</span>
      )
    },
    cell: ({ row }) => {
      const product = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              asChild
              onClick={() => console.log("edit product", product.id)}
            >
              <Link href={`/dashboard/products/${product.id}`}>Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="text-red-600 hover:!text-red-600"
            >
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="flex items-center group hover:text-white hover:!bg-red-500 gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none">
                    <Trash className="size-4 group-hover:text-white text-red-600" />
                    Delete
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your current product specifications.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction
                      asChild
                      onClick={() => deleteProducts([product.id])}
                    >
                      <Button variant="danger">Delete</Button>
                    </AlertDialogAction>

                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]