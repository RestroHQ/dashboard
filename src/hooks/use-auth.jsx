"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { axiosClient } from "@/lib/axios";
import { useToast } from "./use-toast";
import { queryClient } from "@/providers/react-query";
import { signInWithCredentials, signUpWithCredentials } from "@/services/user";
import {
  setStoredToken,
  getStoredToken,
  decodeToken,
  removeStoredToken,
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

  const signUp = useMutation({
    mutationFn: async (credentials) => {
      const { data } = await signUpWithCredentials(credentials);

      return data;
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Please sign in to continue",
      });

      router.push("/auth/sign-in");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to create account",
      });
    },
  });

  const signIn = useMutation({
    mutationFn: async (credentials) => {
      const { data } = await signInWithCredentials(credentials);

      return data;
    },
    onSuccess: (data) => {
      setStoredToken(data.token);

      queryClient.setQueryData(["auth"], data.user);

      toast({
        title: "Logged in",
        description: "Successfully logged in",
      });

      router.push("/dashboard");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to login",
      });
    },
  });

  const signOut = useMutation({
    mutationFn: async () => {
      removeStoredToken();

      queryClient.removeQueries({ queryKey: ["auth"] });

      toast({ title: "Success", description: "Successfully logged out" });

      router.push("/auth/sign-in");
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    signUp: signUp.mutate,
    signIn: signIn.mutate,
    signOut: signOut.mutate,
    hasRole: (role) => user?.roles?.includes(role) ?? false,
  };
}
