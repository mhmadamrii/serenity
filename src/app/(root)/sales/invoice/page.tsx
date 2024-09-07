import { Suspense } from "react";
import { Invoice } from "../_components/parts/invoice";
import { FormSalesInvoice } from "../_components/forms/form-sales-invoice";
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

  return (
    <>
      {searchParams.form === "invoices" ? (
        <FormSalesInvoice currentUserId={session.id} />
      ) : (
        <Suspense fallback={<InvoiceSkeleton />}>
          <Invoice currentUserId={session.id} />
        </Suspense>
      )}
    </>
  );
}
