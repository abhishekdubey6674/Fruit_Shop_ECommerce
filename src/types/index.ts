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
