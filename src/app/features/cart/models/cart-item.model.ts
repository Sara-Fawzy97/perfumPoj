export interface CartItem {
  productId: string;
  name: string;
  brand: string;
  scentProfile: string;
  price: number;
  imageUrl: string;
  sizeMl: number;
  quantity: number;
}

export interface CartSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}
