import axiosInstance from "../lib/axios";
import { AdsResponse } from "@/src/types/ad";

export const favoriteService = {
  getFavorites: async (locale: string): Promise<AdsResponse> => {
    const response = await axiosInstance.get("/favorites", {
      headers: { "Accept-Language": locale },
    });
    return response.data;
  },
};
