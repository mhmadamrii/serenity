import { Products } from "../_components/parts/products";
import { Suspense } from "react";
import { Customers } from "../_components/parts/customers";
import { DataStoreHeader } from "../_components/data-store-header";
import { FormProduct } from "../_components/forms/form-product";
import { ProductSkeleton } from "~/components/skeletons/product-skeleton";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: {
    form_products: string;
  };
}) {
  return (
    <>
      <DataStoreHeader headerName="products" />
      <Suspense fallback={<ProductSkeleton />}>
        <Products />
      </Suspense>
      <FormProduct open={searchParams.form_products === "true"} />
    </>
  );
}
