"use client";

import { useModalControl } from "@/hooks/use-modal";
import { useGetRestaurantQuery } from "@/hooks/use-restaurant";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const OnboardingProvider = ({ children }) => {
  const { data: restaurant } = useGetRestaurantQuery();
  const { openModal, closeModal } = useModalControl({
    modalId: "onboarding",
  });

  const router = useRouter();

  useEffect(() => {
    if (!restaurant?.id) {
      openModal();
    }

    if (restaurant?.id) {
      closeModal();
      router.push(`/app/${restaurant?.id}`);
    }
  }, [restaurant]);

  return children;
};

export default OnboardingProvider;
