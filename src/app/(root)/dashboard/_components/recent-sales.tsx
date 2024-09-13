import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Suspense } from "react";
import { api } from "~/trpc/server";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function RecentSales({ userId }: { userId: string }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecentSalesData userId={userId} />
    </Suspense>
  );
}

async function RecentSalesData({ userId }: { userId: string }) {
  const res = await api.contact.getContacts({
    userId: userId,
  });

  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {res.map(({ address, name, email, id }) => (
          <div key={id} className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
            <div className="ml-auto font-medium">+$1,999.00</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
