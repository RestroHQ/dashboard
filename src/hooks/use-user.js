"use client";

import { getCurrentUser } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUserQuery = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => getCurrentUser(),
  });
};
