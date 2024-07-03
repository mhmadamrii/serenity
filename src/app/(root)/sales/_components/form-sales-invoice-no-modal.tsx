import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { CalendarDays } from "lucide-react";

export function FormSalesInvoice() {
  return (
    <Card className="mx-auto max-w-2xl p-6 sm:p-8 md:p-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">New Invoice</CardTitle>
        <CardDescription>
          Fill out the details below to create a new invoice.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoice-number">Invoice Number</Label>
              <Input id="invoice-number" placeholder="INV-001" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-name">Customer Name</Label>
              <Input id="customer-name" placeholder="John Doe" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subtotal">Subtotal</Label>
              <Input id="subtotal" type="number" placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax">Tax</Label>
              <Input id="tax" type="number" placeholder="0.00" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="invoice-date">Invoice Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start font-normal"
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  <span>Select a date</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar />
              </PopoverContent>
            </Popover>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Create Invoice</Button>
      </CardFooter>
    </Card>
  );
}
