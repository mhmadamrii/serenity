import { api } from "~/trpc/server";
import { FormCustomer } from "./_components/forms/form-customer";
import { DataStoreClient } from "./data-store-client";

export default async function DataStore({
  searchParams,
}: {
  searchParams: {
    form_customers: string;
  };
}) {
  const customers = await api.customer.getCustomers();
  return (
    <>
      <DataStoreClient customers={customers} />
      {searchParams.form_customers == "true" && <FormCustomer />}
    </>
  );
}
