import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { StorageService } from '../../../core/services/storage.service';

const CART_STORAGE_KEY = 'perfumpoj_cart_items';

@Injectable({
  providedIn: 'root'
})
export class CartState {
  private readonly storage = inject(StorageService);

  readonly items = signal<CartItem[]>(this.loadInitialItems());

  readonly itemCount = computed(() =>
    this.items().reduce((total, item) => total + item.quantity, 0)
  );

  readonly subtotal = computed(() =>
    this.items().reduce((total, item) => total + item.price * item.quantity, 0)
  );

  readonly shipping = computed(() => {
    const sub = this.subtotal();
    return sub === 0 || sub >= 150 ? 0 : 15;
  });

  readonly tax = computed(() => {
    return +(this.subtotal() * 0.08).toFixed(2);
  });

  readonly total = computed(() => {
    return this.subtotal() + this.shipping() + this.tax();
  });

  constructor() {
    // Automatically persist changes to local storage
    effect(() => {
      this.storage.setItem(CART_STORAGE_KEY, this.items());
    });
  }

  addItem(product: Omit<CartItem, 'quantity'>, quantity = 1): void {
    const current = this.items();
    const existingIndex = current.findIndex(
      i => i.productId === product.productId && i.sizeMl === product.sizeMl
    );

    if (existingIndex > -1) {
      const updated = [...current];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + quantity
      };
      this.items.set(updated);
    } else {
      this.items.set([...current, { ...product, quantity }]);
    }
  }

  updateQuantity(productId: string, sizeMl: number, delta: number): void {
    const current = this.items();
    const existingIndex = current.findIndex(
      i => i.productId === productId && i.sizeMl === sizeMl
    );

    if (existingIndex === -1) {
      return;
    }

    const newQuantity = current[existingIndex].quantity + delta;
    if (newQuantity <= 0) {
      this.removeItem(productId, sizeMl);
    } else {
      const updated = [...current];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: newQuantity
      };
      this.items.set(updated);
    }
  }

  removeItem(productId: string, sizeMl: number): void {
    this.items.set(
      this.items().filter(i => !(i.productId === productId && i.sizeMl === sizeMl))
    );
  }

  clearCart(): void {
    this.items.set([]);
  }

  private loadInitialItems(): CartItem[] {
    const saved = this.storage.getItem<CartItem[]>(CART_STORAGE_KEY);
    return saved ?? [];
  }
}
