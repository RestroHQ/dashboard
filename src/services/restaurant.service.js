export const getRestaurants = async () => {
  try {
    const response = await axiosClient.post("/restaurant");

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getRestaurant = async (id) => {
  try {
    const response = await axiosClient.post(`/restaurant/${id}`);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createRestaurant = async (data) => {
  try {
    const response = await axiosClient.post("/restaurant", data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
