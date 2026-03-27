import axiosInstance from "../lib/axios";
import { AdsResponse } from "@/src/types/ad";

export interface SearchAdsParams {
  category_id?: string;
  city_id?: string;
  min_price?: string;
  max_price?: string;
  search?: string;
  type?: string;
}

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

  searchAds: async (
    locale: string,
    params: SearchAdsParams,
  ): Promise<AdsResponse> => {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(
        ([, v]) => v !== undefined && v !== null && v !== "",
      ),
    );
    const response = await axiosInstance.get("/ads/ads/search", {
      headers: { "Accept-Language": locale },
      params: cleanParams,
    });
    return response.data;
  },

  getCommercialStores: async (locale: string) => {
    const response = await axiosInstance.get("/user/commercial/store", {
      headers: { "Accept-Language": locale },
    });
    return response.data;
  },
};
