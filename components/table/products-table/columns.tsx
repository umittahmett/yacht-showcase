"use client"
import { ColumnDef } from "@tanstack/react-table"

export type Product = {
  id: string
  images: string[]
  base_informations?: {
    id: string
    field_name: string
    value: string
    language_code: string
  }[]
  status: "pending" | "processing" | "success" | "failed"
  created_at: string
}

import { ArrowUpDown, MoreHorizontal, Pen, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

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
    header: ({ column }) => {
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
        <Link href={`/dashboard/product/${product.id}`}>
          <img  
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
      const productName = product.base_informations?.[0]?.value

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
            <DropdownMenuItem asChild onClick={() => console.log('edit product', product.id)}
            >
              <Link href={`/dashboard/product/${product.id}`}>Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
            className="text-red-600 hover:!text-red-600"
              onClick={() => console.log('delete product', product.id)}
            >
              <Trash className="text-red-600" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]