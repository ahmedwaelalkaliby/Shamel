export interface AdImage {
  id: number;
  ad_id: number;
  image_path: string;
}

export interface Ad {
  id: number;
  title: string;
  price: string;
  description: string;
  images: AdImage[];
  featured: number;
  location?: string | null;
  category_id?: number;
  category_detail_id?: number;
  city_id?: number;
  phone?: string;
  user_id?: number;
  // Add other fields as they appear in the API
}

export interface AdsResponse {
  status: boolean;
  data: Ad[];
  message: string;
}


