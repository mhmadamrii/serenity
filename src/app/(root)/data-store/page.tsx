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
  const products = await api.product.getProducts();
  return (
    <>
      <DataStoreClient customers={customers} products={products} />
      {searchParams.form_customers == "true" && <FormCustomer />}
    </>
  );
}
