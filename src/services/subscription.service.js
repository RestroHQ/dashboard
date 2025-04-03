import { axiosClientWithAuth } from "@/lib/axios";

export const getSubscription = async (restaurantId) => {
  try {
    const response = await axiosClientWithAuth.get(
      `/restaurants/${restaurantId}/subscription`,
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching subscription:", error);
    throw error;
  }
};

export const createCheckoutSession = async ({
  restaurantId,
  planId,
  successUrl,
  cancelUrl,
}) => {
  try {
    console.log("Creating checkout session for restaurant:", restaurantId);

    const response = await axiosClientWithAuth.post(
      `/restaurants/${restaurantId}/subscription`,
      {
        planId,
        successUrl,
        cancelUrl,
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error creating restaurant:", error);
    throw error;
  }
};
