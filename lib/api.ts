import { CategoriesResponse } from "@/types/category";
import { AdsResponse } from "@/types/ad";

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

export async function getLatestAds(locale: string): Promise<AdsResponse> {
  const response = await fetch(`${BASE_URL}/ads/ads/latest`, {
    headers: {
      "Accept-Language": locale,
      "Authorization": "Bearer {Token}",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch latest ads: ${response.statusText}`);
  }

  return response.json();
}

export async function getTodayOffers(locale: string): Promise<AdsResponse> {
  const response = await fetch(`${BASE_URL}/ads/ads/today-offers`, {
    headers: {
      "Accept-Language": locale,
      "Authorization": "Bearer {Token}",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch today offers: ${response.statusText}`);
  }

  return response.json();
}

export async function getFavorites(locale: string): Promise<AdsResponse> {
  const response = await fetch(`${BASE_URL}/favorites`, {
    headers: {
      "Accept-Language": locale,
      "Authorization": "Bearer {Token}",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch favorites: ${response.statusText}`);
  }

  return response.json();
}
