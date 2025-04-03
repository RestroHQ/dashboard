"use client";

import Loader from "@/components/common/loader";
import PageHeader from "@/components/dashboard/page-header";
import { useGetRestaurantQuery } from "@/hooks/use-restaurant";
import Image from "next/image";

const Page = ({ restaurantId }) => {
  const { data: restaurant, isLoading } = useGetRestaurantQuery(restaurantId);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="p-8">
      <div className="flex justify-between">
        <PageHeader
          title="Settings"
          subtitle="Manage your restaurant's settings"
        />
      </div>

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
    </main>
  );
};

export default Page;
