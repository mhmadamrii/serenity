"use client";

import Image from "next/image";

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

interface ICustomers {
  id: number;
  name: string;
  address: string;
  isActive: boolean;
  imageUrl: string | null;
  email: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export function TableCustomers({
  customers,
  currentTab,
}: {
  customers: ICustomers[];
  currentTab: string;
}) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");

  return (
    <>
      <Table
        className={cn("", {
          hidden: customers.length === 0,
        })}
      >
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Contact Name</TableHead>
            <TableHead>Contact Email</TableHead>
            <TableHead className="hidden text-center md:table-cell">
              Status
            </TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">
                <Image
                  quality={100}
                  alt="user image"
                  src={"/no-profile.png"}
                  className="rounded-full border border-gray-600"
                  priority
                  width={60}
                  height={60}
                />
              </TableCell>
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell className="font-medium">{customer.email}</TableCell>
              <TableCell className="text-center">
                <Badge
                  variant="outline"
                  className={cn("bg-red-100 text-red-500", {
                    "bg-green-200 text-green-900": customer.isActive,
                  })}
                >
                  {customer.isActive ? "Active" : "Inactive"}
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
                          `?form_${currentTab}=true&type=edit&id=${customer.id}`,
                        )
                      }
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDeleteId(customer.id.toString())}
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
