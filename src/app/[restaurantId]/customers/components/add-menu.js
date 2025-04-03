import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useFileUpload } from "@/hooks/use-files";
import { useCreateMenuMutation } from "@/hooks/use-menu";
import { Trash2, UploadCloud } from "lucide-react";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormDescription } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createId } from "@paralleldrive/cuid2";
import { CheckCircle } from "lucide-react";
import { FileCheck } from "lucide-react";

const menuFormSchema = z.object({
  name: z.string().min(1, "Menu name is required"),
  description: z.string().optional(),
  isActive: z.boolean().optional().default(true),
  menuItems: z
    .array(
      z.object({
        name: z.string().min(1, "Item name is required"),
        description: z.string().optional(),
        price: z.number().positive("Price must be positive"),
        imageUrl: z.string().optional(),
        isAvailable: z.boolean().optional().default(true),
      }),
    )
    .optional(),
});

export function AddMenuDialog({ data }) {
  const menuId = data ? data.id : createId();

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const { toast } = useToast();

  const { mutate: uploadFile } = useFileUpload({
    onSuccess: (data, variables) => {
      // Check if variables exists before accessing it
      if (variables && variables.entityId !== undefined) {
        const itemIndex = variables.entityId;
        setValue(`menuItems.${itemIndex}.imageUrl`, data.path);
      } else {
        // Fallback solution - update the most recently uploaded item
        const lastItemIndex = menuItems.length - 1;
        setValue(`menuItems.${lastItemIndex}.imageUrl`, data.path);
        console.warn(
          "Upload variables were undefined, used last item as fallback",
        );
      }

      setIsUploading(false);
      setUploadProgress(0);
      toast({
        title: "Image uploaded successfully",
        variant: "default",
      });
    },
    onError: (error) => {
      setIsUploading(false);
      setUploadProgress(0);
      toast({
        title: "Image upload failed",
        description: error.message || "Unknown error occurred",
        variant: "destructive",
      });
    },
    onProgress: (progress) => {
      setUploadProgress(progress);
    },
  });

  const { mutate: createMenu, isLoading: isCreating } = useCreateMenuMutation({
    onSuccess: (data) => {
      toast({
        title: "Menu created successfully",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create menu",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const defaultValues = {
    isActive: true,
    menuItems: [],
  };

  const form = useForm({
    resolver: zodResolver(menuFormSchema),
    defaultValues,
  });

  const { control, handleSubmit, setValue, watch } = form;
  const menuItems = watch("menuItems") || [];

  const onSubmit = (data) => {
    createMenu({ menuId, ...data });
  };

  const handleFileUpload = (file) => {
    if (!file) return;

    setIsUploading(true);
    uploadFile({
      file,
      fileName: file.name,
      contentType: file.type,
      fileSize: file.size,
      type: "MENU_ITEM",
      entityId: menuId,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus size={16} className="mr-2" />
          Create Menu
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-4xl h-[90svh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Menu</DialogTitle>
          <DialogDescription>
            Create a new menu for your restaurant.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Menu Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Menu Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Summer Specials" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of the menu"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Active Menu</FormLabel>
                        <FormDescription>
                          When active, this menu will be visible to customers
                        </FormDescription>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Menu Items</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setValue("menuItems", [
                        ...menuItems,
                        {
                          name: "",
                          description: "",
                          price: 0,
                          imageUrl: "",
                          isAvailable: true,
                        },
                      ]);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg border p-4 space-y-4 relative"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                      onClick={() => {
                        const newItems = [...menuItems];
                        newItems.splice(index, 1);
                        setValue("menuItems", newItems);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={control}
                        name={`menuItems.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Item Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Margherita Pizza"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={`menuItems.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={control}
                      name={`menuItems.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the item..."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={control}
                        name={`menuItems.${index}.isAvailable`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Available
                              </FormLabel>
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
                    </div>

                    <FormField
                      control={control}
                      name={`menuItems.${index}.imageUrl`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Item Image</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-2 gap-4">
                              {field.value ? (
                                <div className="mt-2 flex items-center gap-2">
                                  <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    className="w-full"
                                    disabled
                                  >
                                    <FileCheck size={16} />
                                    <p className="text-sm">Image Uploaded</p>
                                  </Button>

                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="w-fit"
                                    onClick={() => field.onChange("")}
                                  >
                                    Change Image
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        handleFileUpload(file, index);
                                      }
                                    }}
                                    disabled={isUploading}
                                  />
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}

                {menuItems.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No menu items added yet. Click &apos;Add Item&apos; to get
                      started.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Creating..." : "Create Menu"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
