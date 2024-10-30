"use client";

import LogoWithText from "@/components/common/LogoWithText";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetRestaurantQuery } from "@/hooks/use-restaurant";
import { zodResolver } from "@hookform/resolvers/zod";
import signUpImage from "@public/images/auth/sign-up.jpg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  address: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().min(2).max(50),
  operating_hours: z.string().min(2).max(50),
  website: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  image: z.string().min(2).max(50),
  cuisine_type: z.string().min(2).max(50),
});

const Page = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      email: "",
      phone: "",
      operating_hours: "",
      website: "",
      description: "",
      image: "",
      cuisine_type: "",
    },
  });

  const { data: restaurant } = useGetRestaurantQuery();

  useEffect(() => {
    if (restaurant) {
      router.push("/dashboard");
    }
  }, []);

  const onSubmit = async (values) => {
    localStorage.setItem("restaurant", JSON.stringify(values));
    console.log(values);

    router.push("/dashboard");
  };

  const skipOnboarding = () => {
    localStorage.setItem(
      "restaurant",
      JSON.stringify({
        name: "KFC",
        address: "123 KFC Street",
        email: "",
        phone: "1234567890",
        operating_hours: "9am - 5pm",
        website: "https://kfc.com",
        description: "Finger lickin' good",
        image: "https://kfc.com/image.jpg",
      }),
    );

    router.push("/dashboard");
  };

  return (
    <section className="grid grid-cols-2 h-screen max-h-screen overflow-y-hidden">
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

      <section className="p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold">Welcome!</h2>
        <p className="text-gray-500 mb-8">
          Fill in the form below to get started with RestroHQ
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter restaurant name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="operating_hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Operating Hours</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter operating hours" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter website URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter description" {...field} />
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
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cuisine_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuisine Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter cuisine type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Add Restaurant
            </Button>
          </form>
        </Form>

        <Button
          onClick={skipOnboarding}
          variant="outline"
          className="w-full mt-8"
        >
          Skip Onboarding
        </Button>
      </section>
    </section>
  );
};

export default Page;
