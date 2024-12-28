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

      return { fileName, path };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [`${type.toLowerCase()}-image`],
      });

      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  return uploadMutation;
};

// // Example usage in another component:
// const ExampleComponent = () => {
//   const handleUploadProgress = (progress) => {
//     console.log('Upload progress:', progress);
//   };

//   const handleUploadSuccess = (data) => {
//     console.log('Upload completed:', data);
//   };

//   const uploadMutation = useTypedFileUpload({
//     onSuccess: handleUploadSuccess,
//     onProgress: handleUploadProgress
//   });

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     await uploadMutation.mutateAsync({
//       file,
//       type: 'PRODUCT', // Or other entity type
//       entityId: '123' // ID of entity to associate upload with
//     });
//   };

//   return (
//     <input
//       type="file"
//       onChange={handleFileChange}
//       accept="image/*"
//     />
//   );
// };
