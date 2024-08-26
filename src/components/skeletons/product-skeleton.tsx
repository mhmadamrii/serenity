import loading from "../../../public/svg/3-dots-move.svg";
import Image from "next/image";

import { Button } from "../ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";

export function ProductSkeleton() {
  return (
    <div className="container w-full">
      <div>
        <h1 className="mb-6 text-center text-2xl font-bold sm:text-start">
          Products Data
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-2 sm:justify-between">
        {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).map((item) => (
          <Card key={item} className="my-3 flex w-[300px] flex-col">
            <CardHeader className="flex w-full items-center justify-center p-0">
              <Skeleton className="h-[100px] w-[100%]" />
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-center text-xl font-semibold">
                  <Skeleton className="h-7 w-[260px]" />
                </h2>
                <Skeleton />
              </div>
              <Skeleton />
              <Skeleton />
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full">
                <Image priority src={loading} alt="Follow us on Twitter" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
