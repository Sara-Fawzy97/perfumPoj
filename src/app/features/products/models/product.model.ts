export type ProductCategory = 'all' | 'oriental' | 'woody' | 'floral' | 'fresh' | 'gourmand';

export type ProductSortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name-asc';

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface ProductOption {
  id: string;
  sizeMl: number;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  scentProfile: string;
  notes: FragranceNotes;
  imageUrl: string;
  images: string[];
  options: ProductOption[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface ProductFilter {
  searchQuery?: string;
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
}
