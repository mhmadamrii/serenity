"use client";

import Image from "next/image";
import GradualSpacing from "~/components/magicui/gradual-spacing";
import type { Product as IProduct } from "@prisma/client";

import { Button } from "~/components/ui/button";
import { ImagePlaceholder } from "~/components/image-placeholder";
import { cn } from "~/lib/utils";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { useRouter } from "next/navigation";
import { PencilIcon, Trash2 } from "lucide-react";
import { DialogDeletion } from "../dialog-deletion";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";

type ExtendedIProduct = IProduct & {
  contact: {
    name: string;
  };
};

export function TableProducts({
  myProducts,
}: {
  myProducts: ExtendedIProduct[];
}) {
  console.log("myProducts", myProducts);
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");

  return (
    <>
      <div className="grid grid-cols-1 content-center justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {myProducts.map((product) => (
          <Card key={product.id} className="flex h-[340px] w-[300px] flex-col">
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
            <CardContent className="flex-grow px-4 py-0">
              <div className="mb-2 flex items-start justify-between">
                <GradualSpacing
                  className="font-display text-center text-xl font-bold tracking-[-0.1em] text-black dark:text-white md:text-3xl md:leading-[1rem]"
                  text={product.name}
                />
                {product.badge && (
                  <Badge variant="secondary" className="ml-2">
                    {product.badge}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
              <p className="mb-2 text-sm text-muted-foreground">
                supplier: {product.contact?.name}
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
              <Button onClick={() => {}}>
                <PencilIcon />
              </Button>
              <Button
                className="bg-red-100"
                onClick={() => setDeleteId(product.id.toString())}
              >
                <Trash2 color="red" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <DialogDeletion
        deleteId={deleteId}
        setDeleteId={setDeleteId}
        refresh={() => router.refresh()}
        title="product"
      />
    </>
  );
}
