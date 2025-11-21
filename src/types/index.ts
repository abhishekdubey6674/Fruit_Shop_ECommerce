// Type definitions for the Fruit Shop E-Commerce App

export interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  discount: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Fruit {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
}

// API Product type (from backend)
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
  image: string | null;
  created_at: string;
}

// Auth types
export interface RegisterRequest {
  email: string;
  mobile: string;
  full_name: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthTokens {
  refresh: string;
  access: string;
}

export interface AuthResponse {
  msg: string;
  tokens: AuthTokens;
}

export interface UserProfile {
  id: string;
  email: string;
  mobile: string;
  full_name: string;
}

// Address types
export interface AddressRequest {
  house_no: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

export interface AddressResponse extends AddressRequest {
  id: number;
  user: string;
  created_at: string;
}

// Cart types
export interface CartAddRequest {
  product_id: number;
  quantity: number;
}

export interface CartUpdateRequest {
  quantity: number;
}

export interface CartItemResponse {
  id: number;
  product: Product;
  quantity: number;
  created_at: string;
}

export interface CartResponse {
  items: CartItemResponse[];
  total: string;
}

// Order types
export interface OrderItemResponse {
  id: number;
  product: Product;
  quantity: number;
  price: string;
}

export interface OrderResponse {
  id: number;
  user: number;
  items: OrderItemResponse[];
  total?: string;
  total_amount?: string;
  status: string;
  address: AddressResponse | string; // Can be object or string
  created_at: string;
  updated_at?: string;
}

// Payment types
export interface PaymentRequest {
  order: number;
  method: string;
  paid: boolean;
}

export interface PaymentResponse {
  id: number;
  order: number;
  method: string;
  paid: boolean;
  amount: string;
  created_at: string;
}

export interface User {
  id?: string;
  name: string;
  email?: string;
  phone: string;
  isLoggedIn: boolean;
}

export interface CartItem {
  id: string;
  fruitId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  unit: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  createdAt: string;
  deliveryAddress?: Address;
}

export interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

// Navigation types
export type RootStackParamList = {
  Landing: undefined;
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
};

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface OTPResponse {
  success: boolean;
  message: string;
}
