import { queryClient } from "@/providers/react-query";
import {
  createTable,
  getTable,
  getTables,
  updateTable,
} from "@/services/tables.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetTablesQuery = (restaurantId) => {
  return useQuery({
    queryKey: ["tables", restaurantId],
    queryFn: () => getTables(restaurantId),
  });
};

export const useGetTableByIdQuery = (id) => {
  return useQuery({
    queryKey: ["table", id],
    queryFn: () => getTable(id),
  });
};

export const useCreateTableMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: "create-table",
    mutationFn: async ({ restaurantId, data }) => {
      const response = await createTable(restaurantId, data);
      if (response instanceof Error) throw response;
      return response;
    },
    onSuccess: (data) => {
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: ["tables"] });
        localStorage.setItem("tableId", data.id);
        onSuccess?.(data);
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      onError?.(error);
    },
  });
};

export const useUpdateTableMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: "update-table",
    mutationFn: async (data) => {
      const { id, ...updateData } = data;
      const response = await updateTable(id, updateData);
      if (response instanceof Error) throw response;
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["table"] });
      onSuccess?.(data);
    },
    onError: (error) => {
      console.error("Update mutation error:", error);
      onError?.(error);
    },
  });
};

export const useGetTablesByIdsMutation = () => {
  return useMutation({
    mutationKey: ["tables-by-ids"],
    mutationFn: async (ids) => {
      if (!Array.isArray(ids) || ids.length === 0) {
        throw new Error("Invalid table IDs");
      }
      return Promise.all(ids.map((id) => getTable(id)));
    },
  });
};
