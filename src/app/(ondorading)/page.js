"use client";

import Loader from "@/components/common/loader";
import { useGetCurrentRestaurantQuery } from "@/hooks/use-restaurant";
import { useGetCurrentUserQuery } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import OnboardingWizard from "./components/wizard";
import LogoWithText from "@/components/common/logo-with-text";
import { UserNav } from "@/components/dashboard/user-nav";

const Home = () => {
  const router = useRouter();

  const { data: currentRestaurant, isLoading: restaurantLoading } =
    useGetCurrentRestaurantQuery();
  const { data: user, isLoading } = useGetCurrentUserQuery();

  if (isLoading || restaurantLoading) {
    return <Loader />;
  }

  if (currentRestaurant) {
    router.push(`/${currentRestaurant}`);
    return <Loader />;
  }

  const restaurant = user?.staffAt[0]?.restaurantId;

  if (user && restaurant) {
    router.push(`/${restaurant}`);
    return <Loader />;
  }

  return (
    <main className="relative h-screen flex flex-col items-center justify-center">
      <LogoWithText icon="w-12" text="text-2xl" className="mb-4 gap-2" />
      <OnboardingWizard className="max-w-4xl border p-8 rounded-lg h-fit" />

      <div className="absolute top-4 right-4">
        <UserNav align="end" />
      </div>
    </main>
  );
};

export default Home;
