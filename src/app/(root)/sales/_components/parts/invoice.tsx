import { Badge } from "~/components/ui/badge";
import { MoreHorizontal, FileCheck2 } from "lucide-react";
import { Button } from "~/components/ui/button";
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
import { SalesHeader } from "../sales-header";

const products = [
  {
    id: 1, // Add an id property for clarity (optional)
    name: "Laser Lemonade Machine",
    status: "Draft",
    price: 499.99,
    quantity: 25,
    createdAt: "2023-07-12 10:42 AM",
  },
  {
    id: 2, // Add an id property for clarity (optional)
    name: "Hypernova Headphones",
    status: "Active",
    price: 129.99,
    quantity: 100,
    createdAt: "2023-10-18 03:21 PM",
  },
] as const;

export async function Invoice() {
  await new Promise((res, rej) => setTimeout(res, 2000));
  return (
    <>
      <SalesHeader
        headerName="invoices"
        breadcrumbItems={[
          {
            label: "Dashboard",
            path: "/dashboard",
          },
          {
            label: "Sales",
            path: "/sales",
          },
        ]}
      />
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck2 />
            Sales Invoice
          </CardTitle>
          <CardDescription>
            Manage your invoice and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice number</TableHead>

                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">
                  Customer Name
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  {" "}
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    ${product.price.toFixed(2)}
                  </TableCell>{" "}
                  {/* Format price with 2 decimal places */}
                  <TableCell className="hidden md:table-cell">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.createdAt}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("bg-blue-500", {
                        "bg-green-200 text-green-900":
                          product.status == "Active",
                        "bg-gray-100 text-gray-700": product.status == "Draft",
                      })}
                    >
                      {product.status}
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
    </>
  );
}
