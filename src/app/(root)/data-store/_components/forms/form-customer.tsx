"use client";

import Image from "next/image";

import { useRouter, useSearchParams } from "next/navigation";
import { LoaderImage } from "~/components/loader/loader-image";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { z } from "zod";
import { UploadButton } from "~/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

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
  customer_name: z.string().min(2, {
    message: "Invoice number must be at least 2 characters.",
  }),
  customer_address: z.string().min(2, {
    message: "Customer name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  status: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
});

export function FormCustomer({ open }: { open: boolean }) {
  const router = useRouter();
  const session = useSession() as unknown as any;
  const [uploadedImage, setUploadedImage] = useState<string | StaticImport>("");

  const searchParams = useSearchParams();
  const idUser = searchParams.get("id") as "string";
  const typeForm = searchParams.get("type");
  console.log("session", session);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      customer_name: "",
      customer_address: "",
      email: "",
    },
  });

  const { data } = api.contact.getContactById.useQuery({
    id: idUser ?? "13",
  });

  const { mutate, isPending } = api.contact.createContact.useMutation({
    onSuccess: () => {
      toast.success("Successfully create new customer!");
      form.reset();
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to create new customer");
    },
  });

  const { mutate: editCustomer, isPending: isPendingEdit } =
    api.contact.editContact.useMutation({
      onSuccess: async (res) => {
        toast.success("Successfully edit customer!");
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
      name: data.customer_name,
      email: data.email,
      address: data.customer_address,
      status: data.status === "active",
      userId: session?.data?.id,
    };

    switch (typeForm) {
      case "create":
        mutate(rebuildBody);
        break;

      case "edit":
        editCustomer({ ...rebuildBody, id: parseInt(idUser) });
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    if (data && idUser) {
      form.setValue("customer_name", data.name);
      form.setValue("customer_address", data.address);
      form.setValue("email", data.email as string);
      if (data.isActive) {
        form.setValue("status", "active");
      } else {
        form.setValue("status", "not_active");
      }
    } else {
      form.reset();
    }
  }, [data]);

  return (
    <Dialog open={open} onOpenChange={() => router.back()}>
      <DialogContent className="min-h-full min-w-full sm:min-h-[300px] sm:min-w-[650px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus />
            {typeForm == "edit" ? "Edit Contact" : "New Contact"}
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
            <section className="flex items-center gap-3">
              <Image
                quality={100}
                alt="user image"
                src={uploadedImage == "" ? "/no-profile.png" : uploadedImage}
                className="rounded-full border border-gray-600"
                priority
                width={90}
                height={80}
              />
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  console.log("Files: ", res);
                  toast.success("Successfully uploaded image!");
                  setUploadedImage(res[0]?.url as any);
                }}
                onUploadError={(error: Error) => {
                  console.log(error);
                  toast.error("Failed to upload image!");
                }}
              />
            </section>
            <section className="flex w-full flex-col items-start justify-between gap-3 pb-5 sm:flex-row">
              <FormField
                control={form.control}
                name="customer_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Contact Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!data && typeForm === "edit"}
                        placeholder="John Doe"
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
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!data && typeForm === "edit"}
                        type="email"
                        placeholder="john@gmail.com"
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
                name="customer_address"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Contact Address</FormLabel>
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
                name="status"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!data && typeForm === "edit"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select contact status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="not_active">Not Active</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <Button type="submit" className="mt-4 w-full">
              {isPending || isPendingEdit ? (
                <LoaderImage />
              ) : idUser ? (
                "Edit Contact"
              ) : (
                "Create Contact"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
