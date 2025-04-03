import { queryClient } from "@/providers/react-query";
import {
  createReservation,
  getReservation,
  getReservations,
  updateReservation,
} from "@/services/reservation.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetReservationsQuery = (restaurantId) => {
  return useQuery({
    queryKey: ["reservations", restaurantId],
    queryFn: () => getReservations(restaurantId),
  });
};

export const useGetReservationByIdQuery = (id) => {
  return useQuery({
    queryKey: ["reservation", id],
    queryFn: () => getReservation(id),
  });
};

export const useCreateReservationMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: "create-reservation",
    mutationFn: async (data) => {
      const response = await createReservation(data);
      if (response instanceof Error) throw response;
      return response;
    },
    onSuccess: (data) => {
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: ["reservation"] });
        localStorage.setItem("reservationId", data.id);
        onSuccess?.(data);
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      onError?.(error);
    },
  });
};

export const useUpdateReservationMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: "update-reservation",
    mutationFn: async (data) => {
      const { id, ...updateData } = data;
      const response = await updateReservation(id, updateData);
      if (response instanceof Error) throw response;
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reservation"] });
      onSuccess?.(data);
    },
    onError: (error) => {
      console.error("Update mutation error:", error);
      onError?.(error);
    },
  });
};

export const useGetReservationsByIdsMutation = () => {
  return useMutation({
    mutationKey: ["reservations-by-ids"],
    mutationFn: async (ids) => {
      if (!Array.isArray(ids) || ids.length === 0) {
        throw new Error("Invalid reservation IDs");
      }
      return Promise.all(ids.map((id) => getReservation(id)));
    },
  });
};
