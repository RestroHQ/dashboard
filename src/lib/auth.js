import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

export const AUTH_TOKEN_KEY = "token";

export const getStoredToken = () => {
  const cookie = getCookie(AUTH_TOKEN_KEY);

  return cookie;
};

export const setStoredToken = (token) => {
  setCookie(AUTH_TOKEN_KEY, token, {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
};

export const removeStoredToken = () => {
  deleteCookie(AUTH_TOKEN_KEY);
};

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const setStoredUser = (user) => {
  setCookie("user", JSON.stringify(user), {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
};

export const getStoredUser = () => {
  const user = getCookie("user");

  return user ? JSON.parse(user) : null;
};

export const removeStoredUser = () => {
  deleteCookie("user");
};
