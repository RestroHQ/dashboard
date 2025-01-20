import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import OnboardingWizard from "./wizard";
import { cn } from "@/lib/utils";

const AddRestaurantDialog = ({ trigger, isCollapsed = false }) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        {trigger || (
          <Button
            className={cn(
              "w-full justify-start",
              isCollapsed && "justify-center",
            )}
          >
            <PlusCircle className="h-4 w-4" />
            {!isCollapsed && "Add restaurant"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="h-fit max-w-4xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Add restaurant</DialogTitle>
        </DialogHeader>

        <OnboardingWizard />
      </DialogContent>
    </Dialog>
  );
};

export default AddRestaurantDialog;
