"use client";

import Loader from "@/components/common/loader";
import { useGetRestaurantQuery } from "@/hooks/use-restaurant";
import Image from "next/image";

const Page = ({ restaurantId }) => {
  const { data: restaurant, isLoading } = useGetRestaurantQuery(restaurantId);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Settings</h1>

      <div className="flex items-center space-x-4">
        <Image
          src={restaurant.logo}
          alt={restaurant.name}
          width={100}
          height={100}
          className="rounded-full"
        />
        <div>
          <h2>{restaurant.name}</h2>
          <p>{restaurant.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
