"use client";

import Loader from "@/components/common/Loader";
import OnboardingModal from "@/components/dashboard/onboarding";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Loader />;
  }

  return <OnboardingModal />;
};

export default ModalProvider;
