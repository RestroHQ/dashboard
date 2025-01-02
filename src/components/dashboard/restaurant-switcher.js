"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetCurrentUserQuery } from "@/hooks/use-user";
import { setCurrentRestaurant } from "@/services/cookies.service";
import { Skeleton } from "../ui/skeleton";
import AddRestaurantDialog from "./add-restaurant-dialog";
import { PlusCircle } from "lucide-react";

export function RestaurantSwitcher({ isCollapsed = false }) {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { data: user, isLoading } = useGetCurrentUserQuery();

  const restaurants =
    user?.staffAt?.map((item) => ({
      id: item.restaurant.id,
      label: item.restaurant.name,
    })) || [];

  useEffect(() => {
    const restaurantId = pathname.split("/")[1];

    setValue(restaurantId);
  }, []);

  useEffect(() => {
    setCurrentRestaurant(value);

    if (value) {
      router.push(`/${value}`);
    }
  }, [value]);

  if (isLoading) {
    return <Skeleton className="w-full h-10" />;
  }

  if (value === "settings") {
    setValue("");
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            isCollapsed && "justify-center",
          )}
        >
          {!isCollapsed &&
            (value
              ? restaurants?.find((restaurant) => restaurant.id === value)
                  ?.label
              : "Select restaurant")}
          <ChevronsUpDown
            className={cn(
              "h-4 w-4 shrink-0 opacity-50",
              !isCollapsed && "ml-2",
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search restaurant..." />
          <CommandList>
            <CommandEmpty>No restaurant found.</CommandEmpty>
            <CommandGroup>
              {restaurants.map((restaurant) => (
                <CommandItem
                  key={restaurant.id}
                  value={restaurant.id}
                  onSelect={(currentValue) => {
                    if (currentValue !== value) {
                      setValue(currentValue);
                    }
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === restaurant.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {restaurant.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
