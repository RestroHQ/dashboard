"use client";

import { Home, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import LogoWithText from "@/components/common/LogoWithText";
import RestaurantsSwitcher from "./restaurants-switcher";

const items = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex flex-row items-center justify-between mt-1">
          <LogoWithText
            icon="h-6 w-auto"
            text="text-xl"
            className="gap-2 m-1 group-data-[collapsible=icon]:hidden"
          />
          <SidebarTrigger className="m-1" />
        </div>
        <RestaurantsSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Popover>
          <PopoverTrigger className="flex items-start space-x-2 text-left gap-2 border border-gray-200 p-2 rounded-md">
            <div className="h-10 w-10 rounded-md bg-gray-200" />
            <div className="group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-semibold">John Doe</p>
              <p className="text-xs text-gray-500">john@email.com</p>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full">
            Place content for the popover here.
          </PopoverContent>
        </Popover>
      </SidebarFooter>
    </Sidebar>
  );
}
