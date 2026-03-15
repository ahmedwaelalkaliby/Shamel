import axiosInstance from "./axios";

export const registerUser = async (formData: FormData, locale: string = "ar") => {
  const response = await axiosInstance.post("/auth/register", formData, {
    headers: {
      "Accept-Language": locale,
    },

  });
  return response.data;
};
