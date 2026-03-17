import axiosInstance from "../lib/axios";
import { CategoriesResponse } from "@/src/types/category";

export const categoryService = {
  getCategories: async (locale: string): Promise<CategoriesResponse> => {
    const response = await axiosInstance.get("/categories", {
      headers: { "Accept-Language": locale },
    });
    return response.data;
  },
};
