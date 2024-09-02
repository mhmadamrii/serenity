import { Suspense } from "react";
import { ContactSkeleton } from "~/components/skeletons/contact-skeleton";
import { Invoice } from "../_components/parts/invoice";
import { FormSalesInvoice } from "../_components/forms/form-sales-invoice";
import { api } from "~/trpc/server";
import { getServerSession } from "next-auth";
import { authOptions } from "~/lib/auth";

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

  return (
    <>
      {searchParams.form === "invoices" ? (
        <FormSalesInvoice
          customers={customers}
          products={products}
          currentUserId={session.id}
        />
      ) : (
        <Suspense fallback={<ContactSkeleton />}>
          <Invoice />
        </Suspense>
      )}
    </>
  );
}
