import { Users } from "lucide-react";
import { NoData } from "~/components/no-data/NoData";
import { TableContacts } from "../tables/table-contacts";
import { authOptions } from "~/lib/auth";
import { getServerSession } from "next-auth";
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

export async function Contacts({ currentTab = "contacts" }: IProps) {
  await new Promise((res, rej) => setTimeout(res, 1000));
  const session = (await getServerSession(authOptions)) as any;
  const contacts = await api.contact.getContacts({
    userId: session.id,
  });

  return (
    <Card x-chunk="dashboard-06-chunk-0" className="m-5">
      <CardHeader className="flex justify-between">
        <CardTitle className="flex gap-2">
          <Users />
          Contact Data
          <span className="font-base text-gray-500">({contacts.length})</span>
        </CardTitle>
        <CardDescription>
          Manage your contact and view their details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TableContacts currentTab={currentTab} contacts={contacts} />
        <NoData
          name="Contact"
          shouldRender={contacts.length === 0}
          createPathUrl="?form_contacts=true&type=create"
          title="You don't have any contact yet!"
        />
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>{contacts.length}</strong>{" "}
          products
        </div>
      </CardFooter>
    </Card>
  );
}
