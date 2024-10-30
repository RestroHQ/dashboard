"use client";

import Loader from "@/components/common/Loader";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useGetRestaurantQuery } from "@/hooks/use-restaurant";
import { getRestaurant } from "@/services/restaurant";
import { redirect } from "next/navigation";

export default function Layout({ children }) {
  const { data: restaurant } = useGetRestaurantQuery();

  if (!restaurant) {
    redirect("/onboarding");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="m-4">{children}</main>
    </SidebarProvider>
  );
}
