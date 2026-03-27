import axiosInstance from "../lib/axios";
import { AdsResponse } from "@/src/types/ad";

export const adService = {
  getLatestAds: async (locale: string): Promise<AdsResponse> => {
    const response = await axiosInstance.get("/ads/ads/latest", {
      headers: { "Accept-Language": locale },
    });
    return response.data;
  },

  getTodayOffers: async (locale: string): Promise<AdsResponse> => {
    const response = await axiosInstance.get("/ads/ads/today-offers", {
      headers: { "Accept-Language": locale },
    });
    return response.data;
  },

  createAd: async (formData: FormData, locale: string): Promise<any> => {
    const response = await axiosInstance.post("/ads", formData, {
      headers: { 
        "Accept-Language": locale,
        "Content-Type": "multipart/form-data" 
      },
    });
    return response.data;
  },
};

