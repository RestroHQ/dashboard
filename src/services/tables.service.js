import { axiosClientWithAuth } from "@/lib/axios";

export const getTables = async (restaurantId) => {
  try {
    const response = await axiosClientWithAuth.get(
      `/restaurants/${restaurantId}/tables`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTable = async (restaurantId, tableId) => {
  try {
    const response = await axiosClientWithAuth.get(
      `/restaurants/${restaurantId}/tables/${tableId}`,
    );

    return response.data;
  } catch (error) {
    console.log("Error fetching table:", error);
    throw error;
  }
};

export const createTable = async (restaurantId, data) => {
  try {
    const response = await axiosClientWithAuth.post(
      `/restaurants/${restaurantId}/tables`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating table:", error);
    throw error;
  }
};

export const updateTable = async (id, data) => {
  try {
    const response = await axiosClientWithAuth.patch(`/tables/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
