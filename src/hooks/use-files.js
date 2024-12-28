import { queryClient } from "@/providers/react-query";
import { getUploadUrl, uploadToS3 } from "@/services/file.service";
import { useMutation } from "@tanstack/react-query";

export const useFileUpload = ({ onSuccess, onError, onProgress }) => {
  const uploadMutation = useMutation({
    mutationFn: async ({ file, type, entityId }) => {
      const { uploadUrl, fileName, path } = await getUploadUrl({
        fileName: file.name,
        contentType: file.type,
        fileSize: file.size,
        type,
        entityId,
      });

      await uploadToS3(uploadUrl, file, onProgress);

      return { fileName, path, type };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [`${data?.type.toLowerCase()}-image`],
      });

      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  return uploadMutation;
};
