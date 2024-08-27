import { Suspense } from "react";
import { Contacts } from "../_components/parts/contacts";
import { FormCustomer } from "../_components/forms/form-customer";
import { DataStoreHeader } from "../_components/data-store-header";
import { ContactSkeleton } from "~/components/skeletons/contact-skeleton";

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: {
    form_contacts: string;
  };
}) {
  return (
    <>
      <DataStoreHeader headerName="contacts" />
      <Suspense fallback={<ContactSkeleton />}>
        <Contacts />
      </Suspense>
      <FormCustomer open={searchParams.form_contacts === "true"} />
    </>
  );
}
