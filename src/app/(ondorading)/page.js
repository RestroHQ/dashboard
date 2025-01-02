"use client";

import Loader from "@/components/common/loader";
import { useGetCurrentRestaurantQuery } from "@/hooks/use-restaurant";
import { useGetCurrentUserQuery } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import OnboardingWizard from "./components/wizard";

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
    <main className="h-screen flex items-center justify-center">
      <OnboardingWizard className="max-w-4xl border p-8 rounded-lg h-fit" />
    </main>
  );
};

export default Home;
