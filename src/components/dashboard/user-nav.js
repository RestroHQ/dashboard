"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { useGetCurrentUserQuery } from "@/hooks/use-user";
import { getCurrentUser } from "@/services/user.service";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

export function UserNav({ isCollapsed = false }) {
  const { logOut } = useAuth();

  const { data: user, isLoading } = useGetCurrentUserQuery();

  if (isLoading) {
    return <Skeleton className="h-14 w-60" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative w-max flex items-center gap-4 rounded-md border border-input py-2 px-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="https://avatar.iran.liara.run/public"
              alt={user.name}
            />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div
            className={cn(
              "flex flex-col gap-1 items-start",
              isCollapsed && "hidden",
            )}
          >
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/preferences" className="h-full w-full">
              Preferences
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>Billing</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 dark:text-red-400"
          onClick={logOut}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
