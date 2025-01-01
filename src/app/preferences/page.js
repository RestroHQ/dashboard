"use client";

import LogoWithText from "@/components/common/logo-with-text";
import { Button } from "@/components/ui/button";
import { useGetCurrentUserQuery } from "@/hooks/use-user";
import Link from "next/link";
import UserSettings from "./components/user-settings";
import AppSettings from "./components/app-settings";
import Loader from "@/components/common/loader";
import ChangePassword from "./components/change-password";
import { useGetCurrentRestaurantQuery } from "@/hooks/use-restaurant";

const Page = () => {
  const { data: user, isLoading: isUserLoading } = useGetCurrentUserQuery();
  const { data: restaurantId, isLoading: isRestaurantLoading } =
    useGetCurrentRestaurantQuery();

  if (isUserLoading || isRestaurantLoading) {
    return <Loader />;
  }

  return (
    <main className="container max-w-6xl pt-8 pb-16">
      <div className="flex items-center justify-between w-full mb-4">
        <LogoWithText icon="w-6" />

        <Button asChild>
          <Link href={`/${restaurantId}` || "/"}>Back to Dashboard</Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold tracking-tight mt-16">Preferences</h1>
      <p className="text-muted-foreground text-sm mt-4">
        Manage your account settings and preferences.
      </p>

      <hr className="mt-4 mb-8" />

      <AppSettings />

      <hr className="my-8" />

      <UserSettings user={user} />

      <hr className="my-8" />

      <ChangePassword user={user} />
    </main>
  );
};

export default Page;
