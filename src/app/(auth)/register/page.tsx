"use client";

import Link from "next/link";
import RetroGrid from "~/components/magicui/retro-grid";

import { LoaderImage } from "~/components/loader/loader-image";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { cn } from "~/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "~/components/ui/label";
import { useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "~/components/ui/checkbox";
import { api } from "~/trpc/react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

const FormSchema = z.object({
  email: z.string({
    required_error: "Email is required.",
  }),
  password: z.string({
    required_error: "Password is required",
  }),
});

export default function Register() {
  const [isAgree, setIsAgree] = useState<CheckedState>(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();
    setIsLoading(false);
    if (result.error) {
      return toast.error(result.error);
    }
    toast.success("Account created!");
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create an account
          </h1>
          <p className="mt-2 text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
              prefetch={false}
            >
              Sign in
            </Link>
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        disabled={isLoading}
                        placeholder="john@gmail.com"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex flex-col items-center">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123456"
                          disabled={isLoading}
                          type="password"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex flex-col items-center">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123456"
                          disabled={isLoading}
                          type="password"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                required
                onCheckedChange={(val) => setIsAgree(!isAgree)}
              />
              <Label htmlFor="terms" className="text-sm font-medium">
                I agree to the{" "}
                <Link
                  href="#"
                  className="text-primary hover:underline"
                  prefetch={false}
                >
                  terms and conditions
                </Link>
              </Label>
            </div>
            <Button
              type="submit"
              className={cn("w-full", {
                "cursor-not-allowed": !isAgree,
              })}
              disabled={!isAgree}
            >
              {isLoading ? <LoaderImage /> : "Sign Up"}
            </Button>
          </form>
        </Form>
      </div>
      <RetroGrid />
    </div>
  );
}
