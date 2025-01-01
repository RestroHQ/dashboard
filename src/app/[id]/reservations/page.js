"use client";

import Loader from "@/components/common/loader";
import { useGetRestaurantQuery } from "@/hooks/use-restaurant";
import Image from "next/image";

const Page = ({ id }) => {
  const { data: restaurant, isLoading } = useGetRestaurantQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Reservations</h1>
    </div>
  );
};

export default Page;
