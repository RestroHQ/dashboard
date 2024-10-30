"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useGetRestaurantQuery } from "@/hooks/use-restaurant";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
  const router = useRouter();

  const { data: restaurant } = useGetRestaurantQuery();

  useEffect(() => {
    if (!restaurant) {
      router.push("/onboarding");
    }
  }, [restaurant]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="m-4">{children}</main>
    </SidebarProvider>
  );
}
