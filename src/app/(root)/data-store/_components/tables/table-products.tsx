"use client";

import Image from "next/image";

import type { Product as IProducts } from "@prisma/client";
import { Button } from "~/components/ui/button";
import { FormCustomer } from "../forms/form-customer";
import { DialogDeleteCustomer } from "../dialog-delete-customer";
import { cn } from "~/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export function TableProducts({ products }: { products: IProducts[] }) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");

  return (
    <>
      <Table
        className={cn("", {
          hidden: products.length === 0,
        })}
      >
        <TableHeader>
          <TableRow>
            <TableHead>NO</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="hidden text-center md:table-cell">
              Status
            </TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, idx) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell className="font-medium">{product.price}</TableCell>
              <TableCell className="font-medium">{product.stock}</TableCell>
              <TableCell className="text-center">
                <Badge
                  variant="outline"
                  className={cn("bg-red-100 text-red-500", {
                    "bg-green-200 text-green-900": product.status,
                  })}
                >
                  {product.status ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(
                          `?form_products=true&type=edit&id=${product.id}`,
                        )
                      }
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDeleteId(product.id.toString())}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DialogDeleteCustomer
        deleteId={deleteId}
        setDeleteId={setDeleteId}
        refresh={() => router.refresh()}
      />
    </>
  );
}
