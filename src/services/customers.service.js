import { axiosClientWithAuth } from "@/lib/axios";

export const getCustomers = async (restaurantId) => {
  try {
    const response = await axiosClientWithAuth.get(
      `/restaurants/${restaurantId}/customers`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCustomer = async (restaurantId, customerId) => {
  try {
    const response = await axiosClientWithAuth.get(
      `/restaurants/${restaurantId}/customers/${customerId}`,
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching restaurant:", error);
    throw error;
  }
};
