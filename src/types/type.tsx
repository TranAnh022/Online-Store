export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: CategoryType;
}

export interface CategoryType {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface FilterType {
  search?: string;
  price: number;
  category?: string;
}

export interface ProductDto {
  title: string;
  price: number;
  description: string;
  images: string[];
  categoryId: number;
}
