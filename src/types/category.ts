export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface CategoriesResponse {
  status: boolean;
  data: Category[];
  message: string;
}

export interface CategoryDetail {
  id: number;
  name_en: string;
  name_ar: string;
  category_id: number;
}

export interface AdImage {
  id: number;
  image_path: string;
  ad_id: number;
}

export interface Ad {
  id: number;
  title: string;
  price: string;
  images: AdImage[];
  category_id: number;
  category_detail_id: number;
  description: string;
  phone: string;
  location: string | null;
  city_id: number;
  user_id: number;
}

export interface CategoryData {
  id: number;
  name_en: string;
  name_ar: string;
  image: string;
  details: CategoryDetail[];
  ads: Ad[];
}

export interface CategoryDetailsResponse {
  status: boolean;
  data: CategoryData;
  message?: string;
}
