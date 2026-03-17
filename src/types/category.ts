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
