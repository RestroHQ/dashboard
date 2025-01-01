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

  const restaurant = user.staffAt[0]?.restaurantId;

  if (restaurant) {
    router.push(`/${restaurant}`);
    return <Loader />;
  }

  return (
    <main>
      <OnboardingWizard />
    </main>
  );
};

export default Home;
