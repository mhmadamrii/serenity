"use client";

import Image from "next/image";

import { Badge } from "~/components/ui/badge";
import { useState } from "react";
import { DialogDeleteCustomer } from "../dialog-delete-customer";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { MoreHorizontal } from "lucide-react";
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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

interface IProps {
  customers: ICustomers[];
  currentTab: string;
}

interface ICustomers {
  id: number;
  name: string;
  address: string;
  isActive: boolean;
  imageUrl: string | null;
  email: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export function Customers({ customers, currentTab }: IProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");

  return (
    <>
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
                <TableHead className="hidden text-center md:table-cell">
                  Status
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">
                    <Image
                      quality={100}
                      alt="user image"
                      src={"/no-profile.png"}
                      className="rounded-full border border-gray-600"
                      priority
                      width={60}
                      height={60}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell className="font-medium">
                    {customer.email}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={cn("bg-red-100 text-red-500", {
                        "bg-green-200 text-green-900": customer.isActive,
                      })}
                    >
                      {customer.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `?form_${currentTab}=true&type=edit&id=${customer.id}`,
                            )
                          }
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeleteId(customer.id.toString())}
                        >
                          Delete
                        </DropdownMenuItem>
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
            Showing <strong>1-10</strong> of <strong>{customers.length}</strong>{" "}
            products
          </div>
        </CardFooter>
      </Card>

      <DialogDeleteCustomer
        deleteId={deleteId}
        setDeleteId={setDeleteId}
        refresh={() => router.refresh()}
      />
    </>
  );
}
