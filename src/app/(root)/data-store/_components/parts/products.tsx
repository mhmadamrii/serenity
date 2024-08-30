import { api } from "~/trpc/server";
import { NoData } from "~/components/no-data/NoData";
import { PackageSearch, PencilIcon, Trash2 } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "~/lib/auth";
import { TableProducts } from "../tables/table-products";

export async function Products() {
  const session = (await getServerSession(authOptions)) as any;
  await new Promise((res, rej) => setTimeout(res, 500));
  const myProducts = await api.product.getProducts({
    userId: session?.id,
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        <PackageSearch />
        Products Data{" "}
        <span className="font-base text-gray-500">({myProducts.length})</span>
      </h1>
      <p className="mb-6 text-gray-500">Manage your product data</p>
      <TableProducts myProducts={myProducts} />
      <NoData
        name="Product"
        shouldRender={myProducts.length === 0}
        createPathUrl="?form_products=true&type=create"
        title="You don't have any product yet!"
      />
    </div>
  );
}
