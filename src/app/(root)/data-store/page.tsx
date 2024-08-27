import Link from "next/link";

import { Users, Receipt, ShoppingCart } from "lucide-react";
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
    title: "Contact",
    desc: "Manage your contact list and keep track of client information.",
    path: "/data-store/contacts",
    icon: <Users size={100} />,
  },
  {
    id: 2,
    title: "Products",
    desc: "Browse and manage your inventory of products seamlessly.",
    path: "/data-store/products",
    icon: <ShoppingCart size={100} />,
  },
  {
    id: 3,
    title: "Taxes",
    desc: "Keep your tax records organized and up to date.",
    path: "/data-store/products",
    icon: <Receipt size={100} />,
  },
] as const;

export default async function DataStore() {
  return (
    <section className="flex w-full flex-wrap justify-between sm:flex-nowrap">
      {menuLists.map((menu) => (
        <Link key={menu.id} href={menu.path} className="w-full">
          <Card className="m-5 hover:bg-slate-100 hover:dark:bg-slate-900">
            <CardHeader className="flex items-center justify-center">
              {menu.icon}
              <CardTitle className="flex gap-2">{menu.title} Data</CardTitle>
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
