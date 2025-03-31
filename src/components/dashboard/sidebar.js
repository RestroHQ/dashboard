"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  HelpCircle,
  LayoutDashboard,
  Menu,
  Settings,
  Star,
  Store,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LogoWithText from "../common/logo-with-text";
import { RestaurantSwitcher } from "./restaurant-switcher";
import { UserNav } from "./user-nav";
import { FileUser } from "lucide-react";
import AddRestaurantDialog from "./add-restaurant-dialog";
import { BarChart3 } from "lucide-react";
import { CreditCard } from "lucide-react";

export default function Sidebar({ restaurantId, className }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: `/${restaurantId}`,
      color: "text-sky-500",
    },
    {
      label: "POS",
      icon: Store,
      href: `/${restaurantId}/pos`,
      color: "text-violet-500",
    },
    {
      label: "Menus",
      icon: Menu,
      href: `/${restaurantId}/menus`,
      color: "text-pink-500",
    },
    {
      label: "Orders",
      icon: ClipboardList,
      href: `/${restaurantId}/orders`,
      color: "text-orange-500",
    },
    {
      label: "Reservations",
      icon: CalendarDays,
      href: `/${restaurantId}/reservations`,
      color: "text-emerald-500",
    },
    {
      label: "Customers",
      icon: FileUser,
      href: `/${restaurantId}/customers`,
      color: "text-blue-500",
    },
    {
      label: "Reviews",
      icon: Star,
      href: `/${restaurantId}/reviews`,
      color: "text-yellow-500",
    },
    {
      label: "Team",
      icon: Users,
      href: `/${restaurantId}/team`,
      color: "text-fuchsia-500",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: `/${restaurantId}/analytics`,
      color: "text-green-500",
    },
    {
      label: "Billing",
      icon: CreditCard,
      href: `/${restaurantId}/billing`,
      color: "text-purple-500",
    },
    {
      label: "Settings",
      icon: Settings,
      href: `/${restaurantId}/settings`,
      color: "text-gray-500",
    },
    {
      label: "Help & Support",
      icon: HelpCircle,
      href: `/${restaurantId}/support`,
      color: "text-indigo-500",
    },
  ];

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-card min-w-max max-h-svh",
        isCollapsed && "min-w-fit",
        className,
      )}
    >
      <div
        className={cn(
          "border-b px-4 flex items-center justify-start",
          isCollapsed && "justify-center",
        )}
      >
        <Link href={`/${restaurantId}`}>
          <LogoWithText
            icon="h-6 w-6"
            text={cn("text-xl", isCollapsed && "hidden")}
            className="my-4"
          />
        </Link>
      </div>

      <div
        className={cn(
          "border-b px-4 flex flex-col gap-2 items-center justify-start py-4",
        )}
      >
        <RestaurantSwitcher isCollapsed={isCollapsed} />

        <AddRestaurantDialog isCollapsed={isCollapsed} />
      </div>

      <ScrollArea className="flex-1 p-4">
        <nav className="grid gap-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-4 rounded-lg px-4 py-2 shrink-0 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                pathname === route.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
                isCollapsed && "gap-0 justify-center",
              )}
            >
              <route.icon className={cn("h-5 w-5", route.color)} />
              {!isCollapsed && <span>{route.label}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div
        className={cn(
          "border-t p-4 flex flex-col gap-4",
          isCollapsed && "items-center",
        )}
      >
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          {!isCollapsed && <span>Toggle Sidebar</span>}
        </Button>

        <UserNav isCollapsed={isCollapsed} />
      </div>
    </div>
  );
}
