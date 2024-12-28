import axios from "axios";
import { AUTH_TOKEN_KEY } from "./auth";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1",
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 413:
          throw new Error("File size too large");
        case 415:
          throw new Error("Unsupported file type");
        case 429:
          throw new Error("Too many requests. Please try again later");
        default:
          throw new Error(error.response.data.error || "An error occurred");
      }
    }
    throw new Error("Network error");
  },
);
