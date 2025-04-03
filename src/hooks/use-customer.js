import { getCustomer, getCustomers } from "@/services/customers.service";
import { useQuery } from "@tanstack/react-query";

export const useGetCustomersQuery = (restaurantId) => {
  return useQuery({
    queryKey: ["customers", restaurantId],
    queryFn: () => getCustomers(restaurantId),
  });
};

export const useGetCustomerByIdQuery = (restaurantId, customerId) => {
  return useQuery({
    queryKey: ["customer", restaurantId, customerId],
    queryFn: () => getCustomer(restaurantId, customerId),
  });
};
