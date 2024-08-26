import { Suspense } from "react";
import { Customers } from "../_components/parts/customers";
import { FormCustomer } from "../_components/forms/form-customer";
import { DataStoreHeader } from "../_components/data-store-header";

export default function CustomersPage({
  searchParams,
}: {
  searchParams: {
    form_customers: string;
  };
}) {
  return (
    <>
      <DataStoreHeader headerName="contacts" />
      <Suspense fallback={<h1>Loading streaming</h1>}>
        <Customers />
      </Suspense>
      <FormCustomer open={searchParams.form_customers === "true"} />
    </>
  );
}
