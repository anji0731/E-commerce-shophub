// Product types
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  specifications?: Record<string, string>;
}

// Cart types
export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  addresses: Address[];
  wishlist: string[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: Date;
  estimatedDelivery: Date;
}

// Filter types
export interface Filters {
  priceRange: [number, number];
  brands: string[];
  ratings: number[];
  sortBy: 'price-low' | 'price-high' | 'popularity' | 'newest' | 'rating';
}

// Category type
export interface Category {
  id: string;
  name: string;
  icon: string;
}
