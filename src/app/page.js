"use client";

import LogoWithText from "@/components/common/logo-with-text";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useModalControl } from "@/hooks/use-modal";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import signUpImage from "@public/images/auth/sign-up.jpg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }).max(50),
  address: z.string().min(2, { message: "Address is required" }).max(50),
  operating_hours: z
    .string()
    .min(2, { message: "Operating hours is required" })
    .max(50),
  cuisine_type: z
    .string()
    .min(2, { message: "Cuisine type is required" })
    .max(50),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().min(2, { message: "Phone number is required" }).max(50),
  website: z.string().optional(),
  description: z.string().optional(),
  logo: z.string().optional(),
  cover_image: z.string().optional(),
});

const Home = () => {
  const { isOpen, closeModal } = useModalControl({
    modalId: "onboarding",
    defaultOpen: false,
  });

  const { toast } = useToast();

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
      logo: "",
      cover_image: "",
      cuisine_type: "",
    },
  });

  const onSubmit = async (values) => {
    values.id = "cm2wt8wer000n206b7mrq4jfu";

    try {
      localStorage.setItem("restaurant", JSON.stringify(values));

      closeModal();
      window.location.href = `/app/${values.id}`;
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  // const onError = (error) => {
  //   console.log(error);

  //   toast({
  //     title: "Error While Submitting",
  //     description: (
  //       <ul className="list-disc pl-4">
  //         {Object.values(error).map((e, i) => (
  //           <li key={i}>{e.message}</li>
  //         ))}
  //       </ul>
  //     ),
  //     variant: "destructive",
  //   });
  // };

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <LogoWithText icon="w-6 h-6" text="text-xl" className="mb-8" />
      <div className="w-full max-w-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="The Grand Restaurant" {...field} />
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
                    <Input placeholder="123 Main Street" {...field} />
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
                    <Input placeholder="Italian" {...field} />
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
                      <Input
                        placeholder="admin@thegrandrestaurant.com"
                        {...field}
                      />
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
                      <Input placeholder="+(123) 456-7890" {...field} />
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
                      <Input placeholder="9am - 5pm" {...field} />
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
                      <Input
                        placeholder="https://thegrandrestaurant.com"
                        {...field}
                      />
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
                    <Textarea
                      placeholder="Welcome to The Grand Restaurant, where culinary excellence meets timeless elegance. Indulge in a symphony of flavors, crafted by our world-class chefs using the finest ingredients."
                      {...field}
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo</FormLabel>
                    <FormControl>
                      <Input type="file" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cover_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <Input type="file" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full mt-8">
              Add Restaurant
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Home;
