import { Users } from "lucide-react";
import { TableCustomers } from "../tables/table-customers";
import { api } from "~/trpc/server";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { DataStoreHeader } from "../data-store-header";

interface IProps {
  currentTab?: string;
}

export async function Customers({ currentTab = "customers" }: IProps) {
  await new Promise((res, rej) => setTimeout(res, 1000));
  const customers = await api.customer.getCustomers();

  return (
    <Card x-chunk="dashboard-06-chunk-0" className="m-5">
      <CardHeader className="flex justify-between">
        <CardTitle className="flex gap-2">
          <Users />
          Customer's Data
        </CardTitle>
        <CardDescription>
          Manage your customer and view their details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TableCustomers currentTab={currentTab} customers={customers} />
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>{customers.length}</strong>{" "}
          products
        </div>
      </CardFooter>
    </Card>
  );
}
