"use client";

import type { Profile } from "@prisma/client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
});

export default function Settings() {
  const session = useSession() as any;
  const router = useRouter();

  const { data: myProfile } = api.setting.getAcccountDataById.useQuery({
    id: session?.data?.id,
  }) as unknown as any;

  const { mutate, isPending } =
    api.setting.editAccountAndCreateProfile.useMutation({
      onSuccess: () => toast.success("Successfully edit profile"),
      onError: () => toast.error("Successfully edit profile"),
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: session?.data?.email,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const rebuildBody = {
      email: session?.data?.email,
      name: data.username,
      address: data.address,
      userId: session?.data?.id,
    } as any;

    mutate(rebuildBody);
  }

  useEffect(() => {
    if (myProfile !== null) {
      form.setValue("email", session?.data?.email);
      form.setValue("username", myProfile?.name);
      form.setValue("address", myProfile?.address);
    }
  }, [session, myProfile]);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-5">
        <Button
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ChevronLeft />
          Back
        </Button>
      </div>
      <h1 className="mb-6 text-3xl font-bold">Account Settings</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your account details here</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src="/placeholder.svg?height=80&width=80"
                        alt="~johndoe"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" type="button">
                      Change Avatar
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder="John Doe"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This is your public display name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              disabled={isPending}
                              placeholder="john@gmail.com"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This is your email account.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder="Oxford"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This is your email account.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>View your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Account Created</Label>
                <p className="text-sm text-muted-foreground">January 1, 2023</p>
              </div>
              <div>
                <Label>Last Login</Label>
                <p className="text-sm text-muted-foreground">June 15, 2023</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Account Actions</Label>
                <div className="flex flex-col space-y-2">
                  <Button variant="outline">Change Password</Button>
                  <Button variant="outline" className="text-destructive">
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
