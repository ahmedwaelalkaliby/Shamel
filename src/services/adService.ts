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
};
