export const getFileUplaodUrl = async (data) => {
  try {
    const response = await axiosClient.post("/files/upload", data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getFileDownloadUrl = async (data) => {
  try {
    const response = await axiosClient.get("/files/upload", data);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
