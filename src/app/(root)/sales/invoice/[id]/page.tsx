import moment from "moment";

import { getServerSession } from "next-auth";
import { Suspense } from "react";
import { authOptions } from "~/lib/auth";
import { api } from "~/trpc/server";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { CalendarIcon, DownloadIcon } from "lucide-react";
import { SalesHeader } from "../../_components/sales-header";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface DetailSalesInvocieProps {
  id: string;
  currentUserId: string | undefined;
}

export default async function SalesInvoiceById({
  params,
}: {
  params: { id: string };
}) {
  const session = (await getServerSession(authOptions)) as any;

  return (
    <Suspense fallback={<h1>Loading Stream....</h1>}>
      <DetailSalesInvocie id={params?.id} currentUserId={session?.id} />
    </Suspense>
  );
}

async function DetailSalesInvocie({
  id,
  currentUserId,
}: DetailSalesInvocieProps) {
  // await new Promise((res) => setTimeout(res, 3000));
  const invoiceById = await api.invoice.getInvoiceById({
    userId: currentUserId,
    id: id,
  });

  return (
    <DetailSalesInvocieWrapper>
      <section className="absolute bottom-10 top-36 z-50 w-full px-10">
        <Card className="mx-auto w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">
                Invoice #{invoiceById?.invoiceNumber}
              </CardTitle>
              <Button variant="outline">
                <DownloadIcon className="mr-2 h-4 w-4" /> Download Invoice
              </Button>
            </div>
            <CardDescription>
              <span
                className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                  invoiceById?.status === "PAID"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {invoiceById?.status}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Customer ID</Label>
                <p className="text-sm text-gray-500">
                  {invoiceById?.customerId}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">User ID</Label>
                <p className="text-sm text-gray-500">{invoiceById?.userId}</p>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Description</Label>
              <p className="text-sm text-gray-500">
                {invoiceById?.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Created At</Label>
                <p className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {moment(invoiceById?.createdAt).format("DD/MM/YYYY")}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Updated At</Label>
                <p className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {moment(invoiceById?.updatedAt).format("DD/MM/YYYY")}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>
                  ${(invoiceById?.total! - invoiceById?.tax!).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${invoiceById?.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${invoiceById?.total.toFixed(2)}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </section>
    </DetailSalesInvocieWrapper>
  );
}

function DetailSalesInvocieWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SalesHeader
        headerName="Detail Invoice"
        type="create"
        breadcrumbItems={[
          {
            label: "Dashboard",
            path: "/dashboard",
          },
          {
            label: "Sales",
            path: "/sales",
          },
          {
            label: "Invoices",
            path: "/sales/invoice",
          },
        ]}
      />
      {children}
    </>
  );
}
