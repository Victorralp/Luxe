export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: string[];
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  description?: string;
  sizes?: string[];
  stock?: number;
  createdAt?: Date;
} 