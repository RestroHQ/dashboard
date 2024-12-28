import { axiosClientWithAuth } from "@/lib/axios";

export const getRestaurants = async () => {
  try {
    const response = await axiosClientWithAuth.get("/restaurants");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRestaurant = async (id) => {
  try {
    const response = await axiosClientWithAuth.get(`/restaurants/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching restaurant:", error);
    throw error;
  }
};

export const createRestaurant = async (data) => {
  try {
    const response = await axiosClientWithAuth.post("/restaurants", data);
    return response.data;
  } catch (error) {
    console.error("Error creating restaurant:", error);
    throw error;
  }
};

export const updateRestaurant = async (id, data) => {
  try {
    const response = await axiosClientWithAuth.patch(
      `/restaurants/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
