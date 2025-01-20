import { axiosClientWithAuth } from "@/lib/axios";

export const getMenus = async (restaurantId) => {
  try {
    const response = await axiosClientWithAuth.get(
      `/restaurants/${restaurantId}/menus`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMenu = async (id) => {
  try {
    const response = await axiosClientWithAuth.get(`/menus/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching menu:", error);
    throw error;
  }
};

export const createMenu = async (data) => {
  try {
    const response = await axiosClientWithAuth.post("/menus", data);
    return response.data;
  } catch (error) {
    console.error("Error creating menu:", error);
    throw error;
  }
};

export const updateMenu = async (id, data) => {
  try {
    const response = await axiosClientWithAuth.patch(`/menus/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
