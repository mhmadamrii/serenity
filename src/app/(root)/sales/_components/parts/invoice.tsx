import moment from "moment";

import type {
  Invoice as TInvoice,
  Contact as TCustomers,
} from "@prisma/client";
import { SalesHeader } from "../sales-header";
import { MoreHorizontal, FileCheck2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

export async function Invoice({ invoices, customers }: IProps) {
  await new Promise((res, rej) => setTimeout(res, 2000));
  const getCustomerData = (id: string) => {
    const dataLineItemCustomer = customers.find(
      (customer) => customer.id === +id,
    );
    return dataLineItemCustomer?.name;
  };
  return (
    <>
      <SalesHeader
        headerName="invoices"
        breadcrumbItems={[
          {
            label: "Dashboard",
            path: "/dashboard",
          },
          {
            label: "Sales",
            path: "/sales",
          },
        ]}
      />
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck2 />
            Sales Invoice
            <span className="font-base text-gray-500">({invoices.length})</span>
          </CardTitle>
          <CardDescription>
            Manage your invoice and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice number</TableHead>
                <TableHead className="hidden md:table-cell">
                  Customer Name
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Description
                </TableHead>
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
                          "bg-red-100 text-red-700":
                            invoice.status === "UNPAID",
                        },
                      )}
                    >
                      {invoice.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
