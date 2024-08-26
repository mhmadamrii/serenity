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
    title: "Customers",
    desc: "Lorem ipsum dolor sit amet",
    path: "/data-store/customers",
    icon: <Users size={100} />,
  },
  {
    id: 2,
    title: "Products",
    desc: "Lorem ipsum dolor sit amet",
    path: "/data-store/products",
    icon: <ShoppingCart size={100} />,
  },
  {
    id: 3,
    title: "Taxes",
    desc: "Lorem ipsum dolor sit amet",
    path: "/data-store/products",
    icon: <Receipt size={100} />,
  },
] as const;

export default async function DataStore() {
  return (
    <section className="flex w-full justify-between">
      {menuLists.map((menu) => (
        <Link key={menu.id} href={menu.path} className="w-full">
          <Card className="m-5 hover:bg-slate-100 hover:dark:bg-slate-900">
            <CardHeader className="flex items-center justify-center">
              {menu.icon}
              <CardTitle className="flex gap-2">{menu.title} Data</CardTitle>
              <CardDescription>
                Manage your customer and view their details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Separator className="my-4" />
              <div className="text-xs text-muted-foreground">{menu.desc}</div>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </Link>
      ))}
    </section>
  );
}
