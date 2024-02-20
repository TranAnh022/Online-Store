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

enum Role {
  customer,
  admin,
}

export interface UserType {
  id: number;
  email: string;
  password: string;
  name: string;
  role: Role;
  avatar: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
