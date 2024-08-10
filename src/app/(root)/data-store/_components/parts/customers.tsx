"use client";

import Image from "next/image";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { MoreHorizontal } from "lucide-react";

const customers = [
  {
    id: "123",
    imageUrl: "https://placebeard.it/250/250",
    email: "john@mail.com",
    name: "John Doe",
    isActive: true,
  },
  {
    id: "456",
    imageUrl: "https://placebeard.it/250/250",
    email: "jane@mail.com",
    name: "Jane Doe",
    isActive: true,
  },
] as const;

export function Customers() {
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Customer's Data</CardTitle>
        <CardDescription>
          Manage your customer and view their details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Customer Email</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                {" "}
                <TableCell className="font-medium">
                  <Image
                    width={0}
                    height={0}
                    src={customer.imageUrl}
                    className="h-10 w-10 rounded-full"
                    alt="user"
                  />
                </TableCell>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("bg-blue-500", {
                      "bg-green-200 text-green-900": customer.isActive,
                      "bg-gray-100 text-gray-700": customer.isActive,
                    })}
                  >
                    {customer.isActive}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
