import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

export const useGetSessionQuery = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: () => {
      const session = {};

      const isAuthenticated = getCookie("is_authenticated");

      session.isLoggedIn = isAuthenticated ? true : false;

      return session;
    },
  });
};
