import { queryClient } from "@/providers/react-query";
import {
  createMenu,
  getMenu,
  getMenus,
  updateMenu,
} from "@/services/menu.service";
import {
  createCheckoutSession,
  getSubscription,
} from "@/services/subscription.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetSubscriptionQuery = (restaurantId) => {
  return useQuery({
    queryKey: ["subscription", restaurantId],
    queryFn: () => getSubscription(restaurantId),
  });
};

export const useCreateCheckoutSessionMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: "create-checkout-session",
    mutationFn: async (restaurantId, planId, successUrl, cancelUrl) => {
      const response = await createCheckoutSession(
        restaurantId,
        planId,
        successUrl,
        cancelUrl,
      );

      if (response instanceof Error) {
        throw response;
      }

      return response;
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      onError?.(error);
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });
};
