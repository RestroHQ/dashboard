import { axiosClientWithAuth } from "@/lib/axios";

export const getAnalytics = async (restaurantId, startDate, endDate) => {
  try {
    const response = await axiosClientWithAuth.get(
      `/restaurants/${restaurantId}/analytics`,
      {
        params: {
          startDate,
          endDate,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
