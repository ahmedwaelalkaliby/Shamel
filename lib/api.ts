import { CategoriesResponse } from "@/types/category";
import { AdsResponse } from "@/types/ad";
import { getAuthToken } from "@/src/lib/cookies";


const BASE_URL = "https://souqshamel.com/api";

export async function getCategories(locale: string): Promise<CategoriesResponse> {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/categories`, {
    headers: {
      "Accept-Language": locale,
      "Authorization": token ? `Bearer ${token}` : "Bearer {Token}",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getLatestAds(locale: string): Promise<AdsResponse> {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/ads/ads/latest`, {
    headers: {
      "Accept-Language": locale,
      "Authorization": token ? `Bearer ${token}` : "Bearer {Token}",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch latest ads: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getTodayOffers(locale: string): Promise<AdsResponse> {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/ads/ads/today-offers`, {
    headers: {
      "Accept-Language": locale,
      "Authorization": token ? `Bearer ${token}` : "Bearer {Token}",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch today offers: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getFavorites(locale: string): Promise<AdsResponse> {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/favorites`, {
    headers: {
      "Accept-Language": locale,
      "Authorization": token ? `Bearer ${token}` : "Bearer {Token}",
    },
  });



  if (!response.ok) {
    throw new Error(`Failed to fetch favorites: ${response.statusText}`);
  }

  return response.json();
}
