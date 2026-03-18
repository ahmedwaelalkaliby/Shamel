import axiosInstance from "../lib/axios";
import { CategoriesResponse, CategoryDetailsResponse } from "@/src/types/category";

export const categoryService = {
  getCategories: async (locale: string): Promise<CategoriesResponse> => {
    const response = await axiosInstance.get("/categories", {
      headers: { "Accept-Language": locale },
    });
    return response.data;
  },

  getCategoryDetails: async (locale: string, categoryId: string): Promise<CategoryDetailsResponse> => {
    const response = await axiosInstance.get(`/categories/${categoryId}`, {
      headers: { "Accept-Language": locale },
    });
    return response.data;
  },
};
