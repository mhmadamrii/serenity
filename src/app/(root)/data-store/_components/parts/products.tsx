import GradualSpacing from "~/components/magicui/gradual-spacing";
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
import { PackageSearch, PencilIcon, Trash2 } from "lucide-react";
import { ImagePlaceholder } from "~/components/image-placeholder";
import { cn } from "~/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "~/lib/auth";

export async function Products() {
  const session = (await getServerSession(authOptions)) as any;
  await new Promise((res, rej) => setTimeout(res, 1000));
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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {myProducts.map((product) => (
          <Card key={product.id} className="flex h-[300px] w-[300px] flex-col">
            <CardHeader className="p-0">
              {!product?.imageUrl ? (
                <ImagePlaceholder name={product.name} />
              ) : (
                <Image
                  src={product.imageUrl ?? ""}
                  alt={product.name}
                  className="h-auto rounded-lg"
                  width={100}
                  height={100}
                />
              )}
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <div className="mb-2 flex items-start justify-between">
                <GradualSpacing
                  className="font-display text-center text-xl font-bold tracking-[-0.1em]  text-black dark:text-white md:text-3xl md:leading-[1rem]"
                  text={product.name}
                />
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
            <CardFooter className="flex gap-1 p-4 pt-0">
              <div
                className={cn(
                  "flex h-full flex-grow items-center justify-center rounded-sm bg-green-200 px-2 text-green-600",
                  {
                    "bg-red-200 text-red-600": !product.status,
                  },
                )}
              >
                {product.status ? "Active" : "Inactive"}
              </div>
              <Button>
                <PencilIcon />
              </Button>
              <Button>
                <Trash2 />
              </Button>
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
