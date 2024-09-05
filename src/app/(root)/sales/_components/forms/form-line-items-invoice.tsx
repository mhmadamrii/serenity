import type { Product } from "@prisma/client";

import { cn } from "~/lib/utils";
import { Trash2 } from "lucide-react";
import { Input } from "~/components/ui/input";

import {
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

type TotalLineItemsState = {
  product: string;
  qty: number;
  id: number;
  price: number;
  total: number;
};

interface IProps {
  totalLineItems: TotalLineItemsState[];
  form: any;
  isPending: boolean;
  products: Product[];
  handleDeleteLineItems: (id: number) => void;
}

export function FormLineItemsInvoice({
  totalLineItems,
  form,
  isPending,
  products,
  handleDeleteLineItems,
}: IProps) {
  const handleLineItemDeletion = (id: number) => {
    handleDeleteLineItems(id);
    const filteredTotalLineItems = form
      .getValues("lineItemsInvoice")
      .filter((item: any, idx: number) => idx !== id - 1);

    form.setValue("lineItemsInvoice", filteredTotalLineItems);
  };

  return (
    <>
      {totalLineItems.map((item, idx) => (
        <div
          key={idx}
          className={cn("flex items-center gap-2 rounded-lg border px-2 py-4", {
            "bg-gray-900": idx % 2 === 0,
          })}
        >
          <FormField
            control={form.control}
            name={`lineItemsInvoice.${idx}.product_id`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel
                  className={cn("block", {
                    hidden: idx !== 0,
                  })}
                >
                  Items
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {products?.map((product) => (
                      <SelectItem
                        key={product.id}
                        value={JSON.stringify(product)}
                      >
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`lineItemsInvoice.${idx}.qty`}
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel
                  className={cn("block text-right", {
                    hidden: idx !== 0,
                  })}
                >
                  Quantity
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    className="text-right"
                    placeholder="Quantity"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`lineItemsInvoice.${idx}.price`}
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel
                  className={cn("block text-right", {
                    hidden: idx !== 0,
                  })}
                >
                  Price
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    className="text-right"
                    placeholder="Price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`lineItemsInvoice.${idx}.total`}
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel
                  className={cn("block text-right", {
                    hidden: idx !== 0,
                  })}
                >
                  Total
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    className="text-right"
                    placeholder="Quantity"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div
            className="ml-4 cursor-pointer rounded-full bg-red-200 p-2"
            onClick={() => handleLineItemDeletion(item.id)}
          >
            <Trash2 color="red" size={15} />
          </div>
        </div>
      ))}
    </>
  );
}
