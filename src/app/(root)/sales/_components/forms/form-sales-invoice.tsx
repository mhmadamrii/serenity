"use client";

import type { Contact, Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { z } from "zod";
import { cn } from "~/lib/utils";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";
import { FormInvoiceWrapper } from "../form-invoice-wrapper";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Calendar } from "~/components/ui/calendar";
import { format } from "date-fns";
import { FormLineItemsInvoice } from "./form-line-items-invoice";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarIcon, CopyPlus, Layers3 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { LoaderImage } from "~/components/loader/loader-image";

const FormSchema = z.object({
  invoice_number: z.string().min(2, {
    message: "Invoice number must be at least 2 characters.",
  }),
  customer_name: z.string().min(2, {
    message: "Customer name must be at least 2 characters.",
  }),
  invoice_date: z.date({
    required_error: "A date of birth is required.",
  }),
  description: z.string().min(2, {
    message: "Description transaction be at least 2 characters",
  }),
  status: z.string().min(2, {
    message: "Status transaction be at least 2 characters",
  }),
  tax: z.coerce.number().min(1, {
    message: "Tax must be at least 1",
  }),
  subTotal: z.coerce.number().optional(),
  // qty: z.coerce.number().min(1, {
  //   message: "Quantity must be at least 1",
  // }),
  lineItemsInvoice: z.array(
    z.object({
      productId: z.string(),
      qty: z.coerce.number(),
      price: z.coerce.number(),
      total: z.coerce.number(),
    }),
  ),
});

interface IProps {
  customers: Contact[];
  products: Product[];
  currentUserId: string;
}

export function FormSalesInvoice({
  customers,
  products,
  currentUserId,
}: IProps) {
  const router = useRouter();
  const [totalLineItems, setTotalLineItems] = useState([
    {
      product: "",
      qty: 0,
      id: 0,
      price: 0,
      total: 0,
    },
  ]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      invoice_number: "",
      customer_name: "",
      description: "",
      tax: 0,
      subTotal: 0,
      status: "",
    },
  });

  const { mutate, isPending } = api.invoice.createInvoice.useMutation({
    onSuccess: (res) => {
      toast.success("Successfully create new invoice");
      setTotalLineItems([]);
      form.reset();
    },
    onError: (err) => console.log("response error", err),
  });

  const handleAddLineItem = (): void => {
    setTotalLineItems([
      ...totalLineItems,
      {
        price: 0,
        product: "",
        qty: 0,
        id: totalLineItems.length + 1,
        total: 0,
      },
    ]);
  };

  const handleDeleteLineItems = (id: number): void => {
    const filteredTotalLineItems = totalLineItems.filter(
      (item) => item.id !== id,
    );
    setTotalLineItems(filteredTotalLineItems);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const parsedCustomer = JSON.parse(data.customer_name);
    const lineItemsInvoiceProduct = data.lineItemsInvoice.map((item) => {
      return {
        ...item,
        productId: JSON.parse(item.productId).id,
      };
    });
    const subTotalAllLineItems = lineItemsInvoiceProduct.reduce((acc, curr) => acc + curr.total, 0) // prettier-ignore

    const rebuildData = {
      customerId: parsedCustomer.id.toString(),
      invoiceNumber: data.invoice_number,
      description: data.description,
      tax: data.tax,
      total: subTotalAllLineItems, // as subtotal
      status: data.status as "PAID" | "UNPAID",
      userId: currentUserId,
      invoiceLineItems: lineItemsInvoiceProduct,
    };

    mutate(rebuildData);
  }

  form.watch("lineItemsInvoice");

  return (
    <FormInvoiceWrapper>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative z-30 w-full p-4"
        >
          <section className="flex w-full flex-row justify-between gap-3 ">
            <section className="flex h-full w-full flex-col justify-between gap-2">
              <div className="flex items-start gap-2">
                <Avatar className="h-[80px] w-[80px]">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <FormField
                  control={form.control}
                  name="customer_name"
                  render={({ field }) => (
                    <FormItem className="w-full ">
                      <FormLabel>Customer Name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            {field.value == ""
                              ? "Select customer"
                              : JSON.parse(field.value).name}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {customers?.map((customer: any) => (
                            <SelectItem
                              key={customer.id}
                              value={JSON.stringify(customer)}
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
              </div>
              <FormField
                control={form.control}
                name="invoice_number"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Invoice Number</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="INV-001"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="flex w-full flex-col gap-4">
              <FormField
                control={form.control}
                name="invoice_date"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Invoice Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="w-full">
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tax"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tax</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="0.0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
          </section>

          <section className="mt-3 flex w-full items-start justify-between gap-3">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status invoice" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="UNPAID">Unpaid</SelectItem>
                      <SelectItem value="PAID">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Transaction Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description"
                      className=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <section className="mt-5 flex flex-col gap-2 rounded-lg border p-3 backdrop-blur-lg">
            <div className="flex w-full justify-end">
              <Button
                className="flex gap-2"
                type="button"
                onClick={handleAddLineItem}
              >
                <CopyPlus />
                Add Item
              </Button>
            </div>
            <FormLineItemsInvoice
              totalLineItems={totalLineItems}
              form={form}
              isPending={isPending}
              products={products}
              handleDeleteLineItems={handleDeleteLineItems}
            />
            <div
              className={cn(
                "mb-5 flex w-full flex-col items-center justify-center",
                {
                  hidden: totalLineItems.length >= 1,
                },
              )}
            >
              <Layers3 size={50} />
              <h1 className="text-lg font-bold text-gray-400">
                Add Multiple Line Items
              </h1>
              <p className="text-base">
                One invoice could be contains more than one line items
              </p>
            </div>
          </section>

          <section className="mt-[90px] flex justify-end">
            <div className="flex w-1/2 flex-col items-end justify-end">
              <Separator className="w-full" />
              <div className="flex items-center gap-3 pt-9">
                <Label>SubTotal</Label>
                <Input
                  disabled={isPending}
                  value={
                    form
                      .watch("lineItemsInvoice")
                      ?.reduce((acc, curr) => acc + Number(curr.total), 0) ?? 0
                  }
                  readOnly
                  className="w-[400px]"
                />
              </div>

              <div className="flex w-1/2 gap-2 pb-9">
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4 w-1/2"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button type="submit" className="mt-4 w-1/2">
                  {isPending ? <LoaderImage /> : "Create Invoice"}
                </Button>
              </div>
              <Separator className="w-full" />
            </div>
          </section>
        </form>
      </Form>
    </FormInvoiceWrapper>
  );
}
