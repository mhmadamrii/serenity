import { SalesHeader } from "../sales-header";
import { MoreHorizontal, FileCheck2 } from "lucide-react";
import { TableSalesInvoice } from "../tables/table-sales-invoice";

import type {
  Invoice as TInvoice,
  Contact as TCustomers,
} from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface IProps {
  invoices: TInvoice[];
  customers: TCustomers[];
}

export function Invoice(props: IProps) {
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
            <span className="font-base text-gray-500">
              ({props.invoices.length})
            </span>
          </CardTitle>
          <CardDescription>
            Manage your invoice and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TableSalesInvoice {...props} />
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing {props.invoices.length} invoices
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
