"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  HelpCircle,
  LayoutDashboard,
  Mail,
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

export default function Sidebar({ id, className }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: `/${id}`,
      color: "text-sky-500",
    },
    {
      label: "POS",
      icon: Store,
      href: `/${id}/pos`,
      color: "text-violet-500",
    },
    {
      label: "Menu Management",
      icon: Menu,
      href: `/${id}/menu`,
      color: "text-pink-500",
    },
    {
      label: "Orders",
      icon: ClipboardList,
      href: `/${id}/orders`,
      color: "text-orange-500",
    },
    {
      label: "Reservations",
      icon: CalendarDays,
      href: `/${id}/reservations`,
      color: "text-emerald-500",
    },
    {
      label: "Customers",
      icon: Users,
      href: `/${id}/customers`,
      color: "text-blue-500",
    },
    {
      label: "Reviews",
      icon: Star,
      href: `/${id}/reviews`,
      color: "text-yellow-500",
    },
    // {
    //   label: "Analytics",
    //   icon: BarChart3,
    //   href: `/${id}/analytics`,
    //   color: "text-green-500",
    // },
    // {
    //   label: "Marketing",
    //   icon: Mail,
    //   href: `/${id}/marketing`,
    //   color: "text-purple-500",
    // },
    {
      label: "Settings",
      icon: Settings,
      href: `/${id}/settings`,
      color: "text-gray-500",
    },
    {
      label: "Help & Support",
      icon: HelpCircle,
      href: `/${id}/support`,
      color: "text-indigo-500",
    },
  ];

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-card min-w-64",
        isCollapsed && "min-w-fit",
        className,
      )}
    >
      <div
        className={cn(
          "border-b px-8 flex items-center justify-start",
          isCollapsed && "justify-center",
        )}
      >
        <Link href="/">
          <LogoWithText
            icon="h-6 w-6"
            text={cn("text-xl", isCollapsed && "hidden")}
            className="my-4"
          />
        </Link>
      </div>

      <div
        className={cn(
          "border-b px-4 flex items-center justify-start py-4",
          isCollapsed && "justify-center",
        )}
      >
        <RestaurantSwitcher />
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
                isCollapsed && "gap-0",
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
          "border-t p-4 items-center flex justify-between",
          isCollapsed && "justify-center",
        )}
      >
        {/* {!isCollapsed && <ThemeToggle />} */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
    </div>
  );
}
