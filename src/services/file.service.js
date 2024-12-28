import { axiosClient } from "@/lib/axios";

export const getUploadUrl = async ({
  fileName,
  contentType,
  fileSize,
  type,
  entityId,
}) => {
  try {
    const { data } = await axiosClient.post("/files/upload", {
      fileName,
      contentType,
      fileSize,
      type,
      entityId,
    });

    return data;
  } catch (error) {
    return error.response?.data;
  }
};

export const uploadToS3 = async (uploadUrl, file, onProgress) => {
  try {
    const response = await axiosClient.put(uploadUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        onProgress?.(percentCompleted);
      },
    });

    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const getFileDownloadUrl = async (data) => {
  try {
    const response = await axiosClient.get("/files/upload", data);

    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};
