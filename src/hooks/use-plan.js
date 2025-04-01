import { getPlans } from "@/services/plan.service";
import { useQuery } from "@tanstack/react-query";

export const useGetPlansQuery = (restaurantId) => {
  return useQuery({
    queryKey: ["plans", restaurantId],
    queryFn: () => getPlans(),
  });
};
