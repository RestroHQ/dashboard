import { getFileDownloadUrl, getFileUplaodUrl } from "@/services/file.service";
import { useMutation } from "@tanstack/react-query";

export const useFileUploadUrlMutation = () => {
  return useMutation({
    mutationKey: ["file-upload-url"],
    mutationFn: async (data) => await getFileUplaodUrl(data),
  });
};

export const useFileDownloadUrlMutation = () => {
  return useMutation({
    mutationKey: ["file-download-url"],
    mutationFn: async (data) => await getFileDownloadUrl(data),
  });
};
