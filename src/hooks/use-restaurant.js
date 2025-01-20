import { queryClient } from "@/providers/react-query";
import { getCurrentRestaurant } from "@/services/cookies.service";
import {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
} from "@/services/restaurant.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetRestaurantQuery = (id) => {
  return useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => getRestaurant(id),
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

export const useGetCurrentRestaurantQuery = () => {
  return useQuery({
    queryKey: ["current-restaurant"],
    queryFn: () => getCurrentRestaurant(),
  });
};

export const useGetRestaurantsByIdsMutation = () => {
  return useMutation({
    mutationKey: ["restaurants-by-ids"],
    mutationFn: async (ids) => {
      if (!Array.isArray(ids) || ids.length === 0) {
        throw new Error("Invalid restaurant IDs");
      }
      return Promise.all(ids.map((id) => getRestaurant(id)));
    },
  });
};
