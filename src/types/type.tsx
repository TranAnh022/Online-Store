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

export interface UserRegister {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface TokenState {
  access_token: string;
  refresh_token: string;
};

export interface CartItem extends ProductType{
  quantity: number
}

export interface CartType {
  products: CartItem[];
}