import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../services/categoryService";
import { useLocale } from "next-intl";

export const useCategories = () => {
  const locale = useLocale();

  return useQuery({
    queryKey: ["categories", locale],
    queryFn: () => categoryService.getCategories(locale),
  });
};

export const useCategoryDetails = (categoryId: string) => {
  const locale = useLocale();

  return useQuery({
    queryKey: ["category-details", locale, categoryId],
    queryFn: () => categoryService.getCategoryDetails(locale, categoryId),
    enabled: !!categoryId,
  });
};
