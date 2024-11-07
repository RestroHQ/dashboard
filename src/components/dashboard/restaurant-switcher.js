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

const restaurants = [
  {
    value: "the-continental",
    label: "The Continental",
  },
  {
    value: "pops-diner",
    label: "Pop's Diner",
  },
  {
    value: "the-krusty-krab",
    label: "The Krusty Krab",
  },
  {
    value: "vitos-pizza",
    label: "Vito's Pizza",
  },
];

export function RestaurantSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const restaurantId = pathname.split("/")[1];

    if (restaurants.some((restaurant) => restaurant.value === restaurantId)) {
      setValue(restaurantId);
    }

    console.log(restaurantId);
  }, []);

  useEffect(() => {
    if (value) {
      router.push(`/${value}`);
    }
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? restaurants.find((restaurant) => restaurant.value === value).label
            : "Select restaurant"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {restaurants.map((restaurant) => (
                <CommandItem
                  key={restaurant.value}
                  value={restaurant.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === restaurant.value ? "opacity-100" : "opacity-0",
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
