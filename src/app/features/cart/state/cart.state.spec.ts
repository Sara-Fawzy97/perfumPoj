import { TestBed } from '@angular/core/testing';
import { CartState } from './cart.state';
import { StorageService } from '../../../core/services/storage.service';

describe('CartState', () => {
  let state: CartState;
  let mockStorage: Partial<StorageService>;

  beforeEach(() => {
    mockStorage = {
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined,
      clear: () => undefined
    };

    TestBed.configureTestingModule({
      providers: [
        CartState,
        { provide: StorageService, useValue: mockStorage }
      ]
    });

    state = TestBed.inject(CartState);
    state.clearCart();
  });

  it('should initialize with empty cart', () => {
    expect(state.items().length).toBe(0);
    expect(state.itemCount()).toBe(0);
    expect(state.subtotal()).toBe(0);
  });

  it('should add item and compute reactive totals', () => {
    state.addItem({
      productId: 'perfume-01',
      name: 'Santal Mystique',
      brand: 'Maison Noir',
      scentProfile: 'Woody',
      price: 100,
      imageUrl: 'test.jpg',
      sizeMl: 100
    }, 2);

    expect(state.items().length).toBe(1);
    expect(state.itemCount()).toBe(2);
    expect(state.subtotal()).toBe(200);
    expect(state.tax()).toBe(16);
    expect(state.shipping()).toBe(0); // Free over $150
    expect(state.total()).toBe(216);
  });

  it('should update quantity and remove item when quantity hits zero', () => {
    state.addItem({
      productId: 'perfume-01',
      name: 'Santal Mystique',
      brand: 'Maison Noir',
      scentProfile: 'Woody',
      price: 50,
      imageUrl: 'test.jpg',
      sizeMl: 50
    }, 1);

    expect(state.itemCount()).toBe(1);

    // Increment
    state.updateQuantity('perfume-01', 50, 1);
    expect(state.itemCount()).toBe(2);

    // Decrement twice to remove
    state.updateQuantity('perfume-01', 50, -1);
    expect(state.itemCount()).toBe(1);
    state.updateQuantity('perfume-01', 50, -1);
    expect(state.itemCount()).toBe(0);
    expect(state.items().length).toBe(0);
  });
});
