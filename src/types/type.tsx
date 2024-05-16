export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  images: ProductImageType[] | null ;
  inventory: number;
  category: CategoryType | null;
}

export interface ProductImageType{
  id: number;
  productId: number;
  url:string
}

export interface CategoryType {
  id: number;
  name: string;
  image: string;
}

export interface FilterType {
  search?: string;
  price?: number;
  category?: string;
}

export interface ProductDto {
  title: string;
  price: number;
  description: string;
  images: string[];
  categoryId: number;
  inventory:number
}

export interface UserType {
  id: number;
  email: string;
  password?: string;
  name: string;
  role: "admin" | "customer";
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

export interface CartItem extends Omit<ProductType, "inventory"> {
  quantity: number;
}

export interface CartType {
  products: CartItem[];
}

