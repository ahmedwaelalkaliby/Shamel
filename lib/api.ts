import { CategoriesResponse } from "@/types/category";

const BASE_URL = "https://souqshamel.com/api";

export async function getCategories(locale: string): Promise<CategoriesResponse> {
  const response = await fetch(`${BASE_URL}/categories`, {
    headers: {
      "Accept-Language": locale,
      "Authorization": "Bearer {Token}", // Placeholder as requested
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }

  return response.json();
}
