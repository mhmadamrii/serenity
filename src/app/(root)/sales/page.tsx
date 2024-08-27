import Link from "next/link";

import { ListOrdered, Receipt, MessageSquareQuote } from "lucide-react";
import { Separator } from "~/components/ui/separator";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const menuLists = [
  {
    id: 1,
    title: "Invoice",
    desc: "Create, send, and manage customer invoices effortlessly.",
    path: "/sales/invoice",
    icon: <Receipt size={100} />,
  },
  {
    id: 2,
    title: "Order",
    desc: "Manage and track sales orders with ease.",
    path: "/sales/order",
    icon: <ListOrdered size={100} />,
  },
  {
    id: 3,
    title: "Quotation",
    desc: "Generate and manage client quotations quickly.",
    path: "/sales/quotation",
    icon: <MessageSquareQuote size={100} />,
  },
] as const;

export default async function Sales() {
  return (
    <section className="flex w-full justify-between">
      {menuLists.map((menu) => (
        <Link key={menu.id} href={menu.path} className="w-full">
          <Card className="m-5 hover:bg-slate-100 hover:dark:bg-slate-900">
            <CardHeader className="flex items-center justify-center">
              {menu.icon}
              <CardTitle className="flex gap-2">Sales {menu.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Separator className="my-4" />
              <CardDescription className="text-center">
                {menu.desc}
              </CardDescription>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </Link>
      ))}
    </section>
  );
}
