"use client";

import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { DialogDeletion } from "~/app/(root)/data-store/_components/dialog-deletion";

import type {
  Invoice as TInvoice,
  Contact as TCustomers,
} from "@prisma/client";

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

interface IProps {
  invoices: TInvoice[];
  customers: TCustomers[];
}

export function TableSalesInvoice({ invoices, customers }: IProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");
  const getCustomerData = (id: string) => {
    const dataLineItemCustomer = customers.find(
      (customer) => customer.id === +id,
    );
    return dataLineItemCustomer?.name;
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice number</TableHead>
            <TableHead className="hidden md:table-cell">
              Customer Name
            </TableHead>
            <TableHead className="hidden md:table-cell">Created at</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead className="hidden md:table-cell">Value</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              {" "}
              <TableCell className="font-medium">
                {invoice.invoiceNumber}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {getCustomerData(invoice.customerId)}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {moment(invoice.createdAt).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {invoice.description}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                Rp. {invoice.total}
              </TableCell>
              <TableCell>
                <div
                  className={cn(
                    "flex w-full items-center justify-center rounded-sm bg-green-100 py-1 font-semibold text-green-700",
                    {
                      "bg-red-100 text-red-700": invoice.status === "UNPAID",
                    },
                  )}
                >
                  {invoice.status}
                </div>
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
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDeleteId(invoice.id.toString())}
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

      <DialogDeletion
        deleteId={deleteId}
        setDeleteId={setDeleteId}
        refresh={() => router.refresh()}
        title="invoice"
      />
    </>
  );
}
