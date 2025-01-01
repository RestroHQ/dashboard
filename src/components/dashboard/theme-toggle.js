"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Computer } from "lucide-react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }) {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex items-center justify-between gap-8 w-40",
            className,
          )}
        >
          {theme === "light" ? (
            <div className="flex items-center gap-2">
              <Sun />
              <p className="-translate-y-px">Light</p>
            </div>
          ) : theme === "dark" ? (
            <div className="flex items-center gap-2">
              <Moon />
              <p className="-translate-y-px">Dark</p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Computer />
              <p className="-translate-y-px">System</p>
            </div>
          )}
          <span className="sr-only">Toggle theme</span>

          <ChevronsUpDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
