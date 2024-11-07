import { axiosClient } from "@/lib/axios";

export const signInWithCredentials = async (data) => {
  try {
    const response = await axiosClient.post("/auth/login", data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const signUpWithCredentials = async (data) => {
  try {
    const response = await axiosClient.post("/auth/register", data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
