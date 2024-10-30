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
import { Fragment, useState } from "react";

const restaurants = [
  {
    value: "mcdonalds",
    label: "McDonald's",
  },
  {
    value: "kfc",
    label: "KFC",
  },
  {
    value: "burger-king",
    label: "Burger King",
  },
];

const RestaurantsSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between group-data-[collapsible=icon]:hidden mt-2"
        >
          {value
            ? restaurants.find((restaurant) => restaurant.value === value).label
            : "Select a restaurant"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <Command>
          <CommandInput placeholder="Search for a restaurant" />
          <CommandList>
            <CommandEmpty>No restaurants found</CommandEmpty>
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
};

export default RestaurantsSwitcher;
