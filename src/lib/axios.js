import axios from "axios";
import { AUTH_TOKEN_KEY } from "./auth";
import { getCookie } from "cookies-next";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

const TOKEN = getCookie(AUTH_TOKEN_KEY);

export const axiosClientWithAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});
