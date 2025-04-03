import { axiosClientWithAuth } from "@/lib/axios";

export const getReservations = async (restaurantId) => {
  try {
    const response = await axiosClientWithAuth.get(
      `/restaurants/${restaurantId}/reservations`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReservation = async (restaurantId, reservationId) => {
  try {
    const response = await axiosClientWithAuth.get(
      `/restaurants/${restaurantId}/reservations/${reservationId}`,
    );

    return response.data;
  } catch (error) {
    console.log("Error fetching reservation:", error);
    throw error;
  }
};

export const createReservation = async (data) => {
  try {
    const response = await axiosClientWithAuth.post("/reservations", data);
    return response.data;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};

export const updateReservation = async (id, data) => {
  try {
    const response = await axiosClientWithAuth.patch(
      `/reservations/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
