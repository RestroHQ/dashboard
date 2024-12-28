import { axiosClient } from "@/lib/axios";

export const loginWithCredentials = async (data) => {
  try {
    const response = await axiosClient.post("/auth/login", data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const registerWithCredentials = async (data) => {
  try {
    const response = await axiosClient.post("/auth/register", data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};