import { queryClient } from "@/providers/react-query";
import { getUploadUrl, uploadToS3 } from "@/services/file.service";
import { useMutation } from "@tanstack/react-query";

export const useFileUpload = ({ type, entityId, onSuccess, onProgress }) => {
  const uploadMutation = useMutation({
    mutationFn: async (file) => {
      const { uploadUrl, fileName, path } = await getUploadUrl({
        fileName: file.name,
        contentType: file.type,
        fileSize: file.size,
        type,
        entityId,
      });

      await uploadToS3(uploadUrl, file, onProgress);

      return { fileName, path };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [`${type.toLowerCase()}-image`],
      });

      console.log("File uploaded successfully");
    },
  });

  return uploadMutation;
};
