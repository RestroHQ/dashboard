"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  username: z.string().max(15).optional(),
  phone: z.string().max(15).optional(),
  image: z.any().optional(),
});

const UserSettings = ({ user }) => {
  const [disabled, setDisabled] = useState(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      username: user.username,
      phone: user.phone,
      image: user.image || undefined,
    },
  });

  const onSubmit = async (values) => {
    console.log("Form values:", values);
  };

  return (
    <section>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">User Settings</h2>
        <Button
          onClick={() => setDisabled(!disabled)}
          className="text-sm font-semibold"
        >
          {disabled ? "Edit" : "Cancel"}
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Kai Rivers"
                    {...field}
                    disabled={disabled}
                  />
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
                    disabled={disabled}
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
                  <Input
                    placeholder="kairivers"
                    {...field}
                    disabled={disabled}
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
                  <Input
                    placeholder="+94771234567"
                    {...field}
                    disabled={disabled}
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
                  <Input type="file" {...field} disabled={disabled} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {user.image && (
            <Image src={user.image} alt={user.name} width={100} height={100} />
          )}

          <Button type="submit" className="w-full" disabled={disabled}>
            Save Changes
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default UserSettings;
