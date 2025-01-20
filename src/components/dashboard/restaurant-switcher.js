"use client";

import { Check, ChevronsUpDown } from "lucide-react";

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
import { useGetCurrentUserQuery } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { setCurrentRestaurant } from "@/services/cookies.service";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { useGetRestaurantsByIdsMutation } from "@/hooks/use-restaurant";
import AddRestaurantDialog from "./add-restaurant-dialog";

export function RestaurantSwitcher({ isCollapsed = false }) {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { data: user, isLoading } = useGetCurrentUserQuery();

  const {
    mutate: getRestaurants,
    data: restaurants,
    isLoading: restaurantsLoading,
  } = useGetRestaurantsByIdsMutation();

  useEffect(() => {
    if (user && user.staffAt) {
      const restaurantIds = user.staffAt.map(
        (restaurant) => restaurant.restaurantId,
      );
      getRestaurants(restaurantIds);
    }
  }, [user]);

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

  if (isLoading || restaurantsLoading || !restaurants) {
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
              ? restaurants?.find((restaurant) => restaurant.id === value)?.name
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
                  {restaurant.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
