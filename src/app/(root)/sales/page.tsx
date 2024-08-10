import { FormSalesInvoice } from "./_components/forms/form-sales-invoice";
import { SalesClient } from "./sales-client";

export default function Sales({
  searchParams,
}: {
  searchParams: {
    form_sales_invoice: string;
  };
}) {
  return (
    <>
      <SalesClient />

      {searchParams.form_sales_invoice == "true" && <FormSalesInvoice />}
    </>
  );
}
