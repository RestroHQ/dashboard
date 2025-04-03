import { queryClient } from "@/providers/react-query";
import {
  createMenu,
  deleteMenu,
  getMenu,
  getMenus,
  updateMenu,
} from "@/services/menu.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetMenusQuery = (restaurantId) => {
  return useQuery({
    queryKey: ["menu", restaurantId],
    queryFn: () => getMenus(restaurantId),
  });
};

export const useGetMenuByIdQuery = (id) => {
  return useQuery({
    queryKey: ["menu", id],
    queryFn: () => getMenu(id),
  });
};

export const useCreateMenuMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: "create-menu",
    mutationFn: async ({ restaurantId, data }) => {
      const response = await createMenu(restaurantId, data);
      if (response instanceof Error) throw response;
      return response;
    },
    onSuccess: (data) => {
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: ["menu"] });
        localStorage.setItem("menuId", data.id);
        onSuccess?.(data);
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      onError?.(error);
    },
  });
};

export const useUpdateMenuMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: "update-menu",
    mutationFn: async ({ restaurantId, menuId, data }) => {
      const response = await updateMenu(restaurantId, menuId, data);

      if (response instanceof Error) {
        throw response;
      }

      return response;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["menu", variables.menuId] });
      queryClient.invalidateQueries({
        queryKey: ["menus", variables.restaurantId],
      });

      onSuccess?.(data);
    },
    onError: (error) => {
      console.error("Update mutation error:", error);
      onError?.(error);
    },
  });
};
export const useGetMenusByIdsMutation = () => {
  return useMutation({
    mutationKey: ["menus-by-ids"],
    mutationFn: async (ids) => {
      if (!Array.isArray(ids) || ids.length === 0) {
        throw new Error("Invalid menu IDs");
      }
      return Promise.all(ids.map((id) => getMenu(id)));
    },
  });
};

export const useDeleteMenuMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: "delete-menu",
    mutationFn: async ({ restaurantId, menuId }) => {
      const response = await deleteMenu(restaurantId, menuId);
      if (response instanceof Error) throw response;
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["menu", restaurantId] });
      onSuccess?.(data);
    },
    onError: (error) => {
      console.error("Delete mutation error:", error);
      onError?.(error);
    },
  });
};
