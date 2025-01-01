import { AUTH_TOKEN_KEY } from "@/services/cookies.service";
import axios from "axios";
import { getCookie } from "cookies-next";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const TOKEN = getCookie(AUTH_TOKEN_KEY);

const options = {
  baseURL: BASE_URL + "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
};

export const axiosClient = axios.create(options);

export const axiosClientWithAuth = axios.create({
  ...options,
  headers: {
    ...options.headers,
    Authorization: `Bearer ${getCookie(AUTH_TOKEN_KEY)}`,
  },
});
