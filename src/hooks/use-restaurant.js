import { queryClient } from "@/providers/react-query";
import { getRestaurant, updateRestaurant } from "@/services/restaurant.service";
import { createRestaurant } from "@/services/restaurant.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetRestaurantQuery = (id) => {
  return useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => getRestaurant(id),
    enabled: !!id,
  });
};

export const useCreateRestaurantMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: "create-restaurant",
    mutationFn: async (data) => {
      const response = await createRestaurant(data);
      if (response instanceof Error) throw response;
      return response;
    },
    onSuccess: (data) => {
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: ["restaurant"] });
        localStorage.setItem("restaurantId", data.id);
        onSuccess?.(data);
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      onError?.(error);
    },
  });
};

export const useUpdateRestaurantMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: "update-restaurant",
    mutationFn: async (data) => {
      const { id, ...updateData } = data;
      const response = await updateRestaurant(id, updateData);
      if (response instanceof Error) throw response;
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["restaurant"] });
      onSuccess?.(data);
    },
    onError: (error) => {
      console.error("Update mutation error:", error);
      onError?.(error);
    },
  });
};
