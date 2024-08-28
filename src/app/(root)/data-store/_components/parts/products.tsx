import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";
import { NoData } from "~/components/no-data/NoData";
import { PackageSearch } from "lucide-react";

export async function Products() {
  await new Promise((res, rej) => setTimeout(res, 1000));
  const myProducts = await api.product.getProducts();
  console.log("myProducts", myProducts);

  return (
    <div className="container mx-auto p-4">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        <PackageSearch />
        Products Data{" "}
        <span className="font-base text-gray-500">({myProducts.length})</span>
      </h1>
      <p className="mb-6 text-gray-500">Manage your product data</p>
      <div className="gap-2sm:grid-cols-2 grid grid-cols-1 lg:grid-cols-4">
        {myProducts.map((product) => (
          <Card key={product.id} className="flex w-[300] flex-col">
            <CardHeader className="p-0">
              <Image
                src={product.imageUrl ?? ""}
                alt={product.name}
                className="h-auto w-full rounded-lg object-cover"
                width={100}
                height={100}
              />
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <div className="mb-2 flex items-start justify-between">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                {product.badge && (
                  <Badge variant="secondary" className="ml-2">
                    {product.badge}
                  </Badge>
                )}
              </div>
              <p className="mb-2 text-sm text-muted-foreground">
                {product.description}
              </p>
              <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <NoData
        name="Product"
        shouldRender={myProducts.length === 0}
        createPathUrl="?form_products=true&type=create"
        title="You don't have any product yet!"
      />
    </div>
  );
}
