import { Users } from "lucide-react";
import { NoData } from "~/components/no-data/NoData";
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
          Contact Data
        </CardTitle>
        <CardDescription>
          Manage your contact and view their details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TableCustomers currentTab={currentTab} customers={customers} />
        <NoData
          name="Contact"
          shouldRender={customers.length === 0}
          createPathUrl="?form_customers=true&type=create"
          title="You don't have any contact yet!"
        />
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
