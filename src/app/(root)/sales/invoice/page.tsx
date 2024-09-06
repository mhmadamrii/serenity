import { Suspense } from "react";
import { Invoice } from "../_components/parts/invoice";
import { FormSalesInvoice } from "../_components/forms/form-sales-invoice";
import { api } from "~/trpc/server";
import { getServerSession } from "next-auth";
import { authOptions } from "~/lib/auth";
import { InvoiceSkeleton } from "~/components/skeletons/invoice-skeleton";

export default async function SalesInvoice({
  searchParams,
}: {
  searchParams: {
    form: string;
    type_form: string;
  };
}) {
  const session = (await getServerSession(authOptions)) as any;

  const customers = await api.contact.getContacts({
    userId: session?.id,
  });

  const products = await api.product.getProducts({
    userId: session?.id,
  });

  const invoices = await api.invoice.getInvoices({
    userId: session?.id,
  });
  console.log("invoices", invoices);

  return (
    <>
      {searchParams.form === "invoices" ? (
        <FormSalesInvoice
          customers={customers}
          products={products}
          currentUserId={session.id}
        />
      ) : (
        <Suspense fallback={<InvoiceSkeleton />}>
          <Invoice invoices={invoices} customers={customers} />
        </Suspense>
      )}
    </>
  );
}
