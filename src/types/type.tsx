export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  images: ProductImageType[] | null;
  inventory: number;
  category: CategoryType | null;
}

export interface ProductImageType {
  id: number;
  productId: number;
  url: string;
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
  imageUrls?: string[];
  imageFiles?: File[];
  categoryId: number;
  inventory: number;
}

export interface UserType {
  id: number;
  email: string;
  name: string;
  role: "Admin" | "User";
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
}

export interface CartItem {
  id: number;
  product: ProductType;
  cartId: number;
  quantity: number;
}

export interface CartType {
  id: number;
  userId: string;
  items: CartItem[];
}

export interface Review {
  id: number;
  user: UserType;
  productId: number;
  rating: number;
  context: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewDto
{
  productId: number;
  rating: number;
  context: string;
}

export interface OrderItem{
  id: number
  orderId: number;
  quantity: number;
  price: number;
  productSnapshot:
  {
    productId: number;
    title: string;
    descripton: string;
    price: number;
  }
}

export interface Order{
  id: number;
  userId: number;
  orderItems: OrderItem[];
  status: OrderStatus
  totalPrice: number;
  createdAt: string
  updatedAt:string
}

export enum OrderStatus
{
  Pending,
  Shipped,
  Cancelled
}