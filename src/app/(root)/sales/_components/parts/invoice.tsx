import { SalesHeader } from "../sales-header";
import { FileCheck2 } from "lucide-react";
import { TableSalesInvoice } from "../tables/table-sales-invoice";
import { api } from "~/trpc/server";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface IProps {
  currentUserId: string;
}

export async function Invoice({ currentUserId }: IProps) {
  const customers = await api.contact.getContacts({
    userId: currentUserId,
  });

  const invoices = await api.invoice.getInvoices({
    userId: currentUserId,
  });
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
          <TableSalesInvoice customers={customers} invoices={invoices} />
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing {invoices.length} invoices
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
