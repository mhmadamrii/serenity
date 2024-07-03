import { Suspense } from "react";
import { TableSalesInvoice } from "./_components/table-sales-invoice";
import { FormSalesInvoice } from "./_components/form-sales-invoice";

export default function Sales({
  searchParams,
}: {
  searchParams: {
    form_sales_invoice: string;
  };
}) {
  console.log("search params", searchParams);
  return (
    <>
      <Suspense fallback={<span>PPR loading data..</span>}>
        <TableSalesInvoice />
      </Suspense>

      {searchParams.form_sales_invoice == "true" && <FormSalesInvoice />}
    </>
  );
}
