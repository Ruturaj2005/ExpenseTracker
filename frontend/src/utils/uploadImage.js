import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosinstance';

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile); // ✅ Corrected key to "file"

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading the image:', error);
    throw error;
  }
};

  