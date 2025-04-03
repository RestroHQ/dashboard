import { getAnalytics } from "@/services/analytic.service";
import { useMutation } from "@tanstack/react-query";

export const useGetAnalyticsMutation = () => {
  return useMutation({
    mutationFn: ({ restaurantId, startDate, endDate }) =>
      getAnalytics(restaurantId, { startDate, endDate }),
  });
};
