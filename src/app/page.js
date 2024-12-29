"use client";

import Loader from "@/components/common/loader";
import OnboardingWizard from "@/components/dashboard/onboading";
import { useGetCurrentRestaurantQuery } from "@/hooks/use-restaurant";
import { useGetCurrentUserQuery } from "@/hooks/use-user";
import { getCurrentRestaurant } from "@/services/cookies.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const { data: user, isLoading } = useGetCurrentUserQuery();

  if (isLoading) {
    return <Loader />;
  }

  const restaurant = user.staffAt[1]?.restaurantId;

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
