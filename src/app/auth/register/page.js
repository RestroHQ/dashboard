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
import { useAuth } from "@/hooks/use-auth";
import { useFileUpload } from "@/hooks/use-files";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { createId } from "@paralleldrive/cuid2";
import signUpImage from "@public/images/auth/sign-up.jpg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    username: z.string().max(15).optional(),
    phone: z.string().max(15).optional(),
    password: z.string().min(8).max(50),
    confirmPassword: z.string().min(8).max(50),
    image: z.any().optional(),
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
  const router = useRouter();

  const { register } = useAuth();
  const { toast } = useToast();

  const userId = createId();

  const { mutateAsync } = useFileUpload({
    type: "AVATAR",
    entityId: userId,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      phone: "",
      password: "",
      confirmPassword: "",
      image: undefined,
    },
  });

  const onSubmit = async (values) => {
    try {
      if (values.image) {
        const file = document.querySelector('input[name="image"]').files[0];

        const { path } = await mutateAsync(file);

        values.image = path;
      } else {
        console.log("No image selected");
      }

      register({ id: userId, ...values });

      toast({
        variant: "success",
        title: "Success",
        description: "Account created successfully",
      });

      form.reset();

      router.push("/auth/login");
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create account",
      });
    }
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

          <h1 className="text-5xl font-bold max-w-md mt-4">
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Kai Rivers" {...field} />
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
                      <FormLabel>
                        Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="kairivers@cuisineworld.com"
                          {...field}
                        />
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
                        <Input placeholder="kairivers" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+94771234567" {...field} />
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
                      <FormLabel>
                        Password <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••••••••"
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
                      <FormLabel>
                        Confirm Password <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input type="file" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Register
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-500">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </section>
    </section>
  );
};

export default Page;
