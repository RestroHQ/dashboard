"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { axiosClient } from "@/lib/axios";
import { useToast } from "./use-toast";
import { queryClient } from "@/providers/react-query";
import {
  loginWithCredentials,
  registerWithCredentials,
  signInWithCredentials,
  signUpWithCredentials,
} from "@/services/user";
import {
  setStoredToken,
  getStoredToken,
  decodeToken,
  removeStoredToken,
  setStoredUser,
  removeStoredUser,
} from "@/lib/auth";

export function useAuth() {
  const router = useRouter();
  const { toast } = useToast();

  const { data: user, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const token = getStoredToken();
      if (!token) {
        throw new Error("No token");
      }

      const decoded = decodeToken(token);
      if (!decoded) {
        throw new Error("Invalid token");
      }

      return decoded;
    },
    retry: false,
  });

  const register = useMutation({
    mutationFn: async (credentials) => {
      const { data } = await registerWithCredentials(credentials);

      return data;
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Please sign in to continue",
      });

      router.push("/auth/login");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to create account",
      });
    },
  });

  const login = useMutation({
    mutationFn: async (credentials) => {
      const data = await loginWithCredentials(credentials);

      return data;
    },
    onSuccess: (data) => {
      if (!data.token) {
        throw new Error("No token");
      }

      setStoredToken(data.token);
      setStoredUser(data.user);

      queryClient.setQueryData(["auth"], data.user);

      toast({
        title: "Logged in",
        description: "Successfully logged in",
      });

      const restaurantId = data.user.restaurants[0]?.restaurantId;

      if (restaurantId) {
        router.push(`/${restaurantId}`);
      } else {
        router.push("/");
      }
    },
    onError: (error) => {
      console.log(error);

      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to login",
      });
    },
  });

  const logOut = useMutation({
    mutationFn: async () => {
      removeStoredToken();
      removeStoredUser();

      queryClient.removeQueries({ queryKey: ["auth"] });

      toast({ title: "Success", description: "Successfully logged out" });

      router.push("/auth/login");
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    register: register.mutate,
    login: login.mutate,
    logOut: logOut.mutate,
  };
}
