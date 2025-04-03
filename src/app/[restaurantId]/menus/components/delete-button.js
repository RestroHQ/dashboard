import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteMenuMutation } from "@/hooks/use-menu";
import { useGetCurrentRestaurantQuery } from "@/hooks/use-restaurant";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function DeleteMenuButton({ menuId, menuName }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { data: restaurantId } = useGetCurrentRestaurantQuery();

  const { mutate: deleteMenu, isLoading } = useDeleteMenuMutation({
    onSuccess: () => {
      toast({
        title: "Menu deleted successfully",
        variant: "default",
      });
      setOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Failed to delete menu",
        description:
          error.message || "An error occurred while deleting the menu",
        variant: "destructive",
      });
    },
  });

  const handleDelete = () => {
    deleteMenu({ restaurantId, menuId });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the menu "{menuName}"? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Menu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
