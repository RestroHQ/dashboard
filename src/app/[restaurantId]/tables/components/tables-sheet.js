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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  useCreateTableMutation,
  useUpdateTableMutation,
} from "@/hooks/use-table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { useGetCurrentRestaurantQuery } from "@/hooks/use-restaurant";

const tableFormSchema = z.object({
  name: z.string().min(1, "Table name is required"),
  capacity: z.coerce
    .number()
    .int()
    .positive("Capacity must be a positive integer"),
  isAvailable: z.boolean().optional().default(true),
});

export const TablesSheet = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const { data: restaurantId } = useGetCurrentRestaurantQuery();

  const { mutate: createTable, isPending: isCreating } = useCreateTableMutation(
    {
      onSuccess: (data) => {
        toast({
          title: "Table created successfully",
          description: `Table "${data.name}" has been created.`,
        });
        form.reset();
        setIsOpen(false);
      },
      onError: (error) => {
        toast({
          title: "Error creating table",
          description: error.message,
          variant: "destructive",
        });
      },
    },
  );

  const { mutate: updateTable, isPending: isUpdating } = useUpdateTableMutation(
    {
      onSuccess: (data) => {
        toast({
          title: "Table updated successfully",
          description: `Table "${data.name}" has been updated.`,
        });
        setIsOpen(false);
      },
      onError: (error) => {
        toast({
          title: "Error updating table",
          description: error.message,
          variant: "destructive",
        });
      },
    },
  );

  const form = useForm({
    resolver: zodResolver(tableFormSchema),
    defaultValues: data || {
      name: "",
      capacity: 2,
      isAvailable: true,
    },
  });

  const onSubmit = (formData) => {
    if (data) {
      updateTable({
        restaurantId,
        data: {
          id: data.id,
          ...formData,
        },
      });
    } else {
      createTable({ restaurantId, data: formData });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {data ? (
          <Button size="sm" variant="outline">
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        ) : (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Table
          </Button>
        )}
      </SheetTrigger>

      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{data ? "Edit Table" : "Create Table"}</SheetTitle>
          <SheetDescription>
            {data
              ? "Update the table details"
              : "Add a new table to your restaurant"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Table Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Table 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      step="1"
                      placeholder="2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isAvailable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Available</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      When available, customers can reserve this table
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isCreating || isUpdating}>
                {data
                  ? isUpdating
                    ? "Updating..."
                    : "Update Table"
                  : isCreating
                    ? "Creating..."
                    : "Create Table"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
