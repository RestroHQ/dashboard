import { axiosClient } from "@/lib/axios";

export const getRestaurants = async () => {
  try {
    const response = await axiosClient.get("/restaurants");

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getRestaurant = async (id) => {
  try {
    const response = await axiosClient.get(`/restaurants/${id}`);

    return response.data;
  } catch (error) {
    console.log("Error fetching restaurant:", error);

    return error;
  }
};

export const createRestaurant = async (data) => {
  try {
    const response = await axiosClient.post("/restaurants", data);

    console.log("Error fetching restaurant:", error);

    return response.data;
  } catch (error) {
    return error;
  }
};
