"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { SalesHeader } from "../sales-header";
import { Input } from "~/components/ui/input";
import { z } from "zod";
import { cn } from "~/lib/utils";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { BgParticlesSales } from "../bg-particles-sales";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Calendar } from "~/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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
  FormDescription,
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
  description: z.string(),
});

export function FormSalesInvoice() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      invoice_number: "",
      customer_name: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {}

  return (
    <>
      <BgParticlesSales />
      <SalesHeader
        headerName="Create Invoice"
        type="create"
        breadcrumbItems={[
          {
            label: "Dashboard",
            path: "/dashboard",
          },
          {
            label: "Sales",
            path: "/sales",
          },
          {
            label: "Invoices",
            path: "/sales/invoice",
          },
        ]}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative z-50 w-full p-4"
        >
          <section className="flex w-full flex-row justify-between gap-3 ">
            <section className="flex h-full w-full flex-col justify-between gap-2">
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
                          <SelectValue placeholder="Select recorded customer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="invoice_number"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Invoice Number</FormLabel>
                    <FormControl>
                      <Input
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

            <section className="flex w-full flex-col gap-2">
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
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
          </section>

          <section className="flex w-full items-center justify-between gap-3">
            <FormField
              control={form.control}
              name="invoice_number"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Subtotal</FormLabel>
                  <FormControl>
                    <Input placeholder="0.0" {...field} className="w-full" />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customer_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tax</FormLabel>
                  <FormControl>
                    <Input placeholder="0.0" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <section className="mt-[90px] flex justify-end">
            <div className="flex w-1/2 flex-col items-end justify-end">
              <Separator className="w-full" />
              <div className="flex items-center gap-3 pt-9">
                <Label>SubTotal</Label>
                <Input value={500} readOnly className="w-[400px]" />
              </div>

              <div className="flex w-1/2 gap-2 pb-9">
                <Button type="button" variant="outline" className="mt-4 w-1/2">
                  Reset
                </Button>
                <Button type="submit" className="mt-4 w-1/2">
                  Create Invoice
                </Button>
              </div>
              <Separator className="w-full" />
            </div>
          </section>
        </form>
      </Form>
    </>
  );
}
