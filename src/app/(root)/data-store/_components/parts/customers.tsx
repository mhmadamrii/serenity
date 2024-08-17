"use client";

import Image from "next/image";
import { Badge } from "~/components/ui/badge";
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
              <TableHead className="hidden md:table-cell">Created at</TableHead>
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
                  {/* <Image
                    width={0}
                    height={0}
                    src={customer.imageUrl as any}
                    className="h-10 w-10 rounded-full border"
                    alt="user"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAC8AUUDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECBv/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDkxFRkABQBVABQAUAAAABVEVAEVARFQBFQERUBEVAEVAAAFRQAAUABUUAAGgEZURRVEUFEUFABRFAAVQABFQBFQERUARUBEVARFQBFQAABUAUAFEUAAAAGgERRFBRFBVQBVQBVQUUAAAVAAEVARFQBFQERUBEVAEVAAAAAFRQFQBQAAAUQRGhAGlZUFVAGhFUURQFQFUQAABAARFQBFQERUBEVAEVAAAAAAAURQAAAAUQRFVlQaEUFVFUURRVABRFAAAQAAQBFQEBAEAERUAQABAAAFEAURQAAAAAAURQVWVBpWVBoRQURQURQAAAQAAEBAEVARFQBABAQAAAAAAAABUAUQAABRFBVZUGlZUFVAGhFBRAFEAUQABAAQBFQBBAEVAEAAAAAAAAAAAAAAAAAFVAFVFBVZUFVAFVAFEAVAAEAAQBAAQQBFQAAAAAAAAAAAAAAAAAABUUBUUFEUFEAaEAUQBRAAQBUEABAAQAAAAAAAAAAAAAAAAAAAAAAFABRAFVAFEAUQBRAAQBUEBUAAAAAAAAAAAAAAAAAAAAAAAAAFEUAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVAFAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAf/Z"
                  /> */}
                </TableCell>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell className="font-medium">{customer.email}</TableCell>
                <TableCell className="font-medium">{customer.name}</TableCell>
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
                      <Button aria-haspopup="true" size="icon" variant="ghost">
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
