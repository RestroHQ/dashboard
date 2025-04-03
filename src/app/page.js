"use client";

import Loader from "@/components/common/loader";
import LogoWithText from "@/components/common/logo-with-text";
import AddRestaurantDialog from "@/components/dashboard/add-restaurant-dialog";
import { UserNav } from "@/components/dashboard/user-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useGetCurrentRestaurantQuery,
  useGetRestaurantsByIdsMutation,
} from "@/hooks/use-restaurant";
import { useGetCurrentUserQuery } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { setCurrentRestaurant } from "@/services/cookies.service";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const getRoleColor = (role) => {
  switch (role) {
    case "OWNER":
      return "bg-red-200";
    case "MANAGER":
      return "bg-blue-200";
    case "CASHEIR":
      return "bg-green-200";
    case "WAITER":
      return "bg-yellow-200";
    case "CHEF":
      return "bg-purple-200";
    default:
      return "bg-gray-200";
  }
};

const Home = () => {
  const router = useRouter();

  const { data: currentRestaurant, isLoading: restaurantLoading } =
    useGetCurrentRestaurantQuery();
  const { data: user, isLoading } = useGetCurrentUserQuery();

  const {
    mutate: getRestaurants,
    data: restaurants,
    isLoading: restaurantsLoading,
  } = useGetRestaurantsByIdsMutation();

  useEffect(() => {
    if (user && user.staffAt) {
      const restaurantIds = user.staffAt.map(
        (restaurant) => restaurant.restaurantId,
      );
      getRestaurants(restaurantIds);
    }
  }, [user, getRestaurants]);

  if (isLoading || restaurantsLoading || restaurantLoading) {
    return <Loader />;
  }

  if (currentRestaurant) {
    router.push(`/${currentRestaurant}`);
    return <Loader />;
  }

  return (
    <main className="relative h-screen container max-w-7xl">
      <div className="flex items-center justify-between pt-8">
        <LogoWithText icon="h-7" text="text-2xl" className="gap-2" />
        <UserNav align="end" />
      </div>

      <h2 className="text-lg font-semibold mt-8">Select a restaurant</h2>

      <div className="grid grid-cols-5 gap-4 mt-4">
        {restaurants?.length > 0 &&
          restaurants.map((restaurant) => {
            const role = restaurant.staff.find(
              (s) => s.userId === user.id,
            ).role;

            return (
              <div
                className="w-full py-2 px-4 border text-sm rounded-lg mb-2 flex items-center gap-4 cursor-pointer"
                key={restaurant.id}
                onClick={() => {
                  router.push(`/${restaurant.id}`);
                  setCurrentRestaurant(restaurant.id);
                }}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={restaurant.logo} alt={restaurant.name} />
                  <AvatarFallback>{restaurant.name[0]}</AvatarFallback>
                </Avatar>

                <div>
                  {restaurant.name}
                  <p
                    className={cn(
                      "text-2xs px-2 w-fit rounded-md mt-1",
                      getRoleColor(role),
                    )}
                  >
                    {role}
                  </p>
                </div>
              </div>
            );
          })}

        <AddRestaurantDialog
          trigger={
            <div
              variant="outline"
              className="w-full py-2 px-4 border text-sm rounded-lg mb-2 flex items-center gap-4 cursor-pointer"
            >
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <PlusCircle className="h-4 w-4" />
              </div>
              Add restaurant
            </div>
          }
        />
      </div>
    </main>
  );
};

export default Home;
