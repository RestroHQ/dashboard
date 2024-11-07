import { deleteCookie, setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

export const AUTH_TOKEN_KEY = "auth_token";

export const getStoredToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  return null;
};

export const setStoredToken = (token) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  setCookie(AUTH_TOKEN_KEY, token, {
    maxAge: 60 * 60 * 24 * 7,
  });
};

export const removeStoredToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  deleteCookie(AUTH_TOKEN_KEY);
};

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};
