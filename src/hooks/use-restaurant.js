import { getRestaurant } from "@/services/restaurant.service";
import { useQuery } from "@tanstack/react-query";

export const useGetRestaurantQuery = () => {
  return useQuery({
    queryKey: ["restaurant"],
    queryFn: getRestaurant,
  });
};
