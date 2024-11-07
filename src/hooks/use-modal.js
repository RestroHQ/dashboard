import { queryClient } from "@/providers/react-query";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useModalControl = ({
  modalId,
  defaultOpen = false,
  onStateChange,
}) => {
  const queryKey = ["modal", modalId];

  const { data: isOpen = defaultOpen } = useQuery({
    queryKey,
    queryFn: () => false,
    initialData: defaultOpen,
    staleTime: Infinity,
  });

  const { mutate: updateModalState } = useMutation({
    mutationFn: (newState) => Promise.resolve(newState),
    onMutate: async (newState) => {
      await queryClient.cancelQueries({ queryKey });
      const previousState = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, newState);
      onStateChange?.(newState);
      return { previousState };
    },
  });

  const openModal = () => updateModalState(true);
  const closeModal = () => updateModalState(false);

  return {
    isOpen,
    openModal,
    closeModal,
  };
};
