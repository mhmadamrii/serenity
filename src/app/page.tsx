import Link from "next/link";

import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Atom, MoveRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative z-50 flex min-h-[100dvh] flex-col bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900">
      <div className="absolute left-0 right-0 top-0 -z-10 h-[230px] bg-purple-400 bg-opacity-40 blur-2xl backdrop-blur-md"></div>
      <header className="sticky top-0 z-10 flex h-14 items-center border-b border-gray-700 px-4 backdrop-blur-sm lg:px-6">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <Atom className="h-6 w-6 animate-spin-slow" />
          <span className="sr-only">Serenity Accounting</span>
        </Link>
        <nav className="ml-auto flex gap-2 sm:gap-3">
          <Link
            href="/register"
            className="inline-flex h-9 w-[100px] items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Register
          </Link>
          <Link
            href="/login"
            className="inline-flex h-9 w-[100px] items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Login
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full border-t py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:grid-cols-2 md:gap-16">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Accounting
                </div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-3xl md:text-5xl xl:text-[3.3rem] 2xl:text-[3.6rem]">
                  Streamline Your Accounting with <span>SERENITY</span>
                </h2>
                <Button className="group inline-flex h-9 items-center justify-center rounded-md px-5 py-2 text-sm font-medium shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  <Link href="/login" className="flex gap-2">
                    Get Started
                    <MoveRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Features
                </div>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Serenity offers a comprehensive suite of accounting features
                  to help your business stay on top of its finances. From
                  invoicing and expense tracking to tax preparation and advanced
                  reporting, Serenity has everything you need to streamline your
                  accounting processes.
                </p>
                <Button
                  variant="outline"
                  className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Flexible Pricing for Every Business
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Serenity offers a range of pricing plans to fit your business
                  needs. Whether you're a small startup or a large enterprise,
                  we have a plan that's right for you.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
              <Card className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold">Basic</h3>
                    <p className="text-4xl font-bold">$9</p>
                    <p className="text-sm text-muted-foreground">/month</p>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                      Invoicing
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                      Expense Tracking
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                      Basic Reporting
                    </li>
                  </ul>
                </div>
                <Button className="mt-6 w-full">Get Started</Button>
              </Card>
              <Card className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold">Professional</h3>
                    <p className="text-4xl font-bold">$29</p>
                    <p className="text-sm text-muted-foreground">/month</p>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                      Invoicing
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                      Expense Tracking
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                      Advanced Reporting
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                      Tax Preparation
                    </li>
                  </ul>
                </div>
                <Button className="mt-6 w-full">Get Started</Button>
              </Card>
              <Card className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold">Enterprise</h3>
                    <p className="text-4xl font-bold">$99</p>
                    <p className="text-sm text-muted-foreground">/month</p>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                      Invoicing
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                      Expense Tracking
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                      Advanced Reporting
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                      Tax Preparation
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                      Dedicated Support
                    </li>
                  </ul>
                </div>
                <Button className="mt-6 w-full">Get Started</Button>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Serenity Accounting. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link
            href="#"
            className="text-xs underline-offset-4 hover:underline"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs underline-offset-4 hover:underline"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
