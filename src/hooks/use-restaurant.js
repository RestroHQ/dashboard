import { queryClient } from "@/providers/react-query";
import { getRestaurant } from "@/services/restaurant.service";
import { createRestaurant } from "@/services/restaurant.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetRestaurantQuery = () => {
  return useQuery({
    queryKey: ["restaurant"],
    queryFn: getRestaurant,
  });
};

export const useCreateRestaurantMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: "create-restaurant",
    mutationFn: createRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurant"] });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
