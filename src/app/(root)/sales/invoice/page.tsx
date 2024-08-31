import { Suspense } from "react";
import { ContactSkeleton } from "~/components/skeletons/contact-skeleton";
import { SalesHeader } from "../_components/sales-header";
import { Invoice } from "../_components/parts/invoice";
import { FormSalesInvoice } from "../_components/forms/form-sales-invoice";

export default async function SalesInvoice({
  searchParams,
}: {
  searchParams: {
    form: string;
    type_form: string;
  };
}) {
  return (
    <>
      {searchParams.form === "invoices" ? (
        <FormSalesInvoice />
      ) : (
        <Suspense fallback={<ContactSkeleton />}>
          <Invoice />
        </Suspense>
      )}
    </>
  );
}
