"use client";

import Loader from "@/components/common/loader";
import OnboardingWizard from "@/components/dashboard/onboading";
import { getCurrentRestaurant } from "@/services/cookies.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const restaurantId = getCurrentRestaurant();

  useEffect(() => {
    if (restaurantId) {
      router.push(`/${restaurantId}`);
    } else {
      return (
        <main>
          <OnboardingWizard />
        </main>
      );
    }
  }, [restaurantId]);

  return <Loader />;
};

export default Home;
