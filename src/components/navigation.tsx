"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { ModeToggle } from "./toggle-theme";
import { signOut } from "next-auth/react";

import {
  CircleUser,
  Menu,
  Package2,
  Search,
  Atom,
  UserRoundCog,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const routes = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Data Store",
    path: "/data-store",
  },
  {
    name: "Sales",
    path: "/sales",
  },
  {
    name: "Purchases",
    path: "/purchase",
  },
] as const;

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex h-16 items-center gap-4 border-b px-4 backdrop-blur-sm md:px-6",
        {
          hidden: pathname === "/settings",
        },
      )}
    >
      <nav className="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-2 text-lg font-semibold md:text-base",
          )}
        >
          <Atom className="h-6 w-6 animate-spin-slow" />
          <span className="sr-only">Acme Inc</span>
        </Link>

        {routes.map((item, idx) => (
          <Link
            key={idx}
            href={item.path}
            className={cn("text-foreground transition-colors", {
              "font-semibold text-red-500": pathname.includes(item.path),
            })}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Serenity Inc</span>
            </Link>
            <Link href="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link
              href="/data-store"
              className="text-muted-foreground hover:text-foreground"
            >
              Data Store
            </Link>
            <Link
              href="/sales"
              className="text-muted-foreground hover:text-foreground"
            >
              Sales
            </Link>
            <Link
              href="/purchase"
              className="text-muted-foreground hover:text-foreground"
            >
              Purchase
            </Link>
            <Link
              href="/report"
              className="text-muted-foreground hover:text-foreground"
            >
              Report
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex flex-1 gap-2 sm:flex-initial">
          <ModeToggle />
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search transactions..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="flex items-center gap-1">
              <UserRoundCog />
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings">Supports</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
