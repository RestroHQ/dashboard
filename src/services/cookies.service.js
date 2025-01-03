import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

export const AUTH_TOKEN_KEY = "token";

export const getTokenCookie = () => {
  const cookie = getCookie(AUTH_TOKEN_KEY);

  return cookie;
};

export const setTokenCookie = (token) => {
  setCookie(AUTH_TOKEN_KEY, token, {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
};

export const removeTokenCookie = () => {
  deleteCookie(AUTH_TOKEN_KEY);
};

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const setCurrentRestaurant = (restaurantId) => {
  setCookie("restaurantId", restaurantId, {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
};

export const getCurrentRestaurant = () => {
  const restaurantId = getCookie("restaurantId");

  return restaurantId ? restaurantId : "";
};

export const removeCurrentRestaurant = () => {
  deleteCookie("restaurantId");
};
