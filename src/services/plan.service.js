import { axiosClientWithAuth } from "@/lib/axios";

export const getPlans = async () => {
  try {
    const response = await axiosClientWithAuth.get("/plans");
    return response.data;
  } catch (error) {
    console.log("Error fetching plans:", error);
    throw error;
  }
};
