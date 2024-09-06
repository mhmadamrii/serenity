"use client";

import Link from "next/link";

import { File, ListFilter, PlusCircle, Slash } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { toPascalCase } from "~/lib/helpers";
import { Fragment } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

interface IProps {
  headerName: string;
  type?: string;
  breadcrumbItems: Array<{
    label: string;
    path: string;
  }>;
}

export function SalesHeader({ headerName, breadcrumbItems, type }: IProps) {
  const router = useRouter();
  return (
    <div className="relative flex w-full items-center justify-between px-6 py-3">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={item.path}>{item.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < breadcrumbItems.length + 1 && (
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              )}
            </Fragment>
          ))}

          <BreadcrumbItem>
            <BreadcrumbPage>
              {type !== "create" ? toPascalCase(headerName) : headerName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div
        className={cn("ml-auto flex items-center gap-2", {
          hidden: type === "create",
        })}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Filter
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>All</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Paid</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Unpaid</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" variant="outline" className="h-8 gap-1">
          <File className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Export
          </span>
        </Button>
        <Button
          size="sm"
          className="h-8 gap-1"
          onClick={() =>
            router.push("/sales/invoice?form=invoices&type=create")
          }
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add {toPascalCase(headerName)}
          </span>
        </Button>
      </div>
    </div>
  );
}
