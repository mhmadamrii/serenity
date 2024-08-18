"use client";

import Image from "next/image";
import Link from "next/link";

import { FaGoogle } from "react-icons/fa";
import { Button } from "~/components/ui/button";
import { TRPCClientError } from "@trpc/client";
import { Input } from "~/components/ui/input";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

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

export default function Login() {
  const router = useRouter();
  const { data } = useSession();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = api.auth.login.useMutation({
    onSuccess: () => {
      toast.success("Login success!");
      router.push("/dashboard");
    },
    onError: (err) => {
      if (err instanceof TRPCClientError) {
        toast.error(err.message);
      }
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (response?.status == 200) {
      toast.success("Succcessfully logged in!");
      return router.push("/dashboard");
    }

    toast.error(response?.error);
  }

  useEffect(() => {
    if (data?.user) {
      router.push("/dashboard");
    }
  }, [data]);

  return (
    <div className="flex h-screen w-full justify-between">
      <div className="flex w-full items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
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
                          placeholder="john@gmail.com"
                          type="email"
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
                            type="password"
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <Button type="submit" className="w-full">
                {isPending ? "Loading" : "Login"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex w-full gap-2"
                onClick={() => signIn("google")}
              >
                <FaGoogle />
                Login with Google
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden w-full bg-muted lg:block">
        <Image
          src="/login-hero.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
