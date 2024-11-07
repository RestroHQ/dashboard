"use client";

import LogoWithText from "@/components/common/logo-with-text";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import signUpImage from "@public/images/auth/sign-up.jpg";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    username: z.string().min(2).max(50),
    password: z.string().min(8).max(50),
    confirmPassword: z.string().min(8).max(50),
  })
  .superRefine((data) => {
    if (data.password !== data.confirmPassword) {
      return {
        confirmPassword: "Passwords do not match",
      };
    }
    if (data.username === data.password) {
      return {
        password: "Password should not be the same as username",
      };
    }
    if (
      ["superadmin", "admin", "moderator"].includes(data.username.toLowerCase())
    ) {
      return {
        username: "Username is not allowed",
      };
    }
    return true;
  });

const Page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <section className="grid grid-cols-2 h-screen">
      <section className="relative text-white">
        <Image
          src={signUpImage}
          alt="Sign up"
          className="w-full h-full object-cover"
          fill
        />
        <div className="absolute bg-black/60 inset-0" />

        <div className="absolute top-1/2 transform -translate-y-1/2 w-full left-4">
          <LogoWithText icon="text-white" text="text-white" asLink />
          <h1 className="text-5xl font-bold max-w-md">
            All your restaurant needs, in one place.
          </h1>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <CardTitle>Hello there!</CardTitle>
            <CardDescription>
              Sign up to get started with RestroHQ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </Form>

            <p className="text-sm text-gray-500 mt-4 text-center">
              Or sign in with
            </p>

            <Button className="w-full mt-2" variant="secondary">
              <Icon icon="devicon:google" />
              <span>Google</span>
            </Button>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/auth/sign-in" className="text-blue-500">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </section>
    </section>
  );
};

export default Page;
