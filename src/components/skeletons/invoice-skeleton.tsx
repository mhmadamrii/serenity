import { Skeleton } from "../ui/skeleton";
import { FileCheck2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function InvoiceSkeleton() {
  return (
    <Card x-chunk="dashboard-06-chunk-0" className="m-5">
      <CardHeader className="flex justify-between">
        <CardTitle className="flex gap-2">
          <FileCheck2 />
          Sales Invoice
        </CardTitle>
        <CardDescription>
          Manage your contact and view their details.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {Array.from([1, 2, 3, 4, 5, 6]).map((item) => (
          <div key={item} className="flex w-full gap-5">
            <Skeleton className="h-14 w-14 rounded-full" />
            <Skeleton className="h-14 w-[70%]" />
            <Skeleton className="h-14 w-[20%]" />
            <Skeleton className="h-14 w-[10%]" />
          </div>
        ))}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
