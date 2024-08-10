import { FormCustomer } from "./_components/forms/form-customer";
import { DataStoreClient } from "./data-store-client";

export default function DataStore({
  searchParams,
}: {
  searchParams: {
    form_customers: string;
  };
}) {
  return (
    <>
      <DataStoreClient />
      {searchParams.form_customers == "true" && <FormCustomer />}
    </>
  );
}
