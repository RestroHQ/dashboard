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

export const getMenu = async (restaurantId, menuId) => {
  try {
    const response = await axiosClientWithAuth.get(
      `/restaurants/${restaurantId}/menus/${menuId}`,
    );

    return response.data;
  } catch (error) {
    console.log("Error fetching menu:", error);
    throw error;
  }
};

export const createMenu = async (restaurantId, data) => {
  try {
    const response = await axiosClientWithAuth.post(
      `/restaurants/${restaurantId}/menus`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating menu:", error);
    throw error;
  }
};

export const updateMenu = async (restaurantId, menuId, data) => {
  try {
    const response = await axiosClientWithAuth.patch(
      `/restaurants/${restaurantId}/menus/${menuId}`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating menu:", error);
    throw error;
  }
};

export const deleteMenu = async (restaurantId, menuId) => {
  try {
    const response = await axiosClientWithAuth.delete(
      `/restaurants/${restaurantId}/menus/${menuId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting menu:", error);
    throw error;
  }
};
