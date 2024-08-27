"use client";

import type { Product } from "@prisma/client";
import { Textarea } from "~/components/ui/textarea";
import { LoaderImage } from "~/components/loader/loader-image";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PackageSearch } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  stock: z.coerce.number(),
  price: z.coerce.number(),
  contactId: z.coerce.number(),
  seller: z.string().min(1, {
    message: "Seller name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Product description must be at least 2 characters.",
  }),
});

export function FormProduct({ open }: { open: boolean }) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const idUser = searchParams.get("id") as "string";
  const typeForm = searchParams.get("type");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      contactId: 0,
      price: 0,
      stock: 0,
      seller: "",
    },
  });

  const { data: customerLists } = api.contact.getContacts.useQuery({
    userId: "",
  });

  const { data } = api.contact.getContactById.useQuery({
    id: idUser ?? "13",
  });

  const { mutate, isPending } = api.product.createProduct.useMutation({
    onSuccess: () => {
      toast.success("Successfully create new product!");
      form.reset();
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to create new product");
    },
  });

  const { mutate: editProduct, isPending: isPendingEdit } =
    api.product.editProduct.useMutation({
      onSuccess: async (res) => {
        toast.success("Successfully edit product!");
        if (res) {
          router.refresh();
          await new Promise((res, _) => setTimeout(res, 500));
          router.back();
        }
      },
      onError: () => {
        toast.error("Failed to create new customer");
      },
    });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const rebuildBody = {
      name: data.name,
      stock: data.stock,
      price: data.price,
      seller: data.seller,
      description: data.description,
      contactId: data.contactId,
    };
    console.log("rebuildBody", rebuildBody);

    switch (typeForm) {
      case "create":
        mutate(rebuildBody);
        break;

      case "edit":
        editProduct({ ...rebuildBody, id: parseInt(idUser) });
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    if (data && idUser) {
      // form.setValue("name", data.name);
      // form.setValue("stock", data.address);
      // form.setValue("price", data.email as string);
    } else {
      form.reset();
    }
  }, [data]);

  console.log("form", form.formState.errors);
  console.log("form", form.getValues("seller"));

  return (
    <Dialog open={open} onOpenChange={() => router.back()}>
      <DialogContent className="min-h-full min-w-full sm:min-h-[400px] sm:min-w-[650px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PackageSearch />
            {typeForm == "edit" ? "Edit Product" : "New Product"}
          </DialogTitle>
          <DialogDescription>
            Fill out the details below to create a new invoice.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col space-y-1"
          >
            <section className="flex w-full flex-col items-start justify-between gap-3 pb-5 sm:flex-row">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!data && typeForm === "edit"}
                        placeholder="Mouse"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!data && typeForm === "edit"}
                        type="text"
                        placeholder="500"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="flex w-full items-start justify-between gap-3 pb-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!data && typeForm === "edit"}
                        placeholder="Oxford"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="seller"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Supplier</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value.toString()}
                      disabled={!data && typeForm === "edit"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {customerLists?.map((customer) => (
                          <SelectItem
                            key={customer.id}
                            value={customer.id.toString()}
                          >
                            {customer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="mt-[100px]">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about the product"
                        className="mb-6"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="h-[10px]"></div>
            </section>

            <Button type="submit" className="mb-[100px] w-full">
              {isPending || isPendingEdit ? (
                <LoaderImage />
              ) : idUser ? (
                "Edit Product"
              ) : (
                "Create Product"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
