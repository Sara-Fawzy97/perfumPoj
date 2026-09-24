import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../../../environments/environment';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'santal-parchment',
    name: 'Santal Parchment',
    brand: 'ODORATUS',
    description: 'Santal Parchment wraps around the skin like vintage vellum paper. It opens with bright top notes, shifting to clean papyrus and warm, rich sandalwood that dry down into dry cardamom and amber.',
    price: 220.00,
    category: 'woody',
    scentProfile: 'WOODY / SANDALWOOD & CARDAMOM',
    notes: {
      top: ['Sicilian Bergamot', 'Pink Pepper'],
      heart: ['Egyptian Jasmine Sambac', 'Papyrus'],
      base: ['West Indian Sandalwood', 'Cardamom', 'Amber']
    },
    imageUrl: '/images/products/santal-parchment-main.png',
    images: [
      '/images/products/santal-parchment-main.png',
      '/images/products/santal-parchment-box.png',
      '/images/products/cbfd.png',
      '/images/products/dea7.png'
    ],
    options: [
      { id: 'opt-sp-30', sizeMl: 30, price: 140.00 },
      { id: 'opt-sp-50', sizeMl: 50, price: 180.00 },
      { id: 'opt-sp-100', sizeMl: 100, price: 220.00 }
    ],
    inStock: true,
    rating: 5.0,
    reviewCount: 214
  },
  {
    id: 'fleur-de-lune',
    name: 'Fleur de Lune',
    brand: 'ODORATUS',
    description: 'A luminous, ethereal distillation of midnight-blooming jasmine, pale iris, and white velvet musk.',
    price: 195.00,
    category: 'floral',
    scentProfile: 'FLORAL / JASMINE & WHITE MUSK',
    notes: {
      top: ['Night-Blooming Jasmine', 'Neroli Water', 'Dewy Pear'],
      heart: ['Florentine Orris', 'White Petals', 'Linden Blossom'],
      base: ['White Musk', 'Silk Cedarwood', 'Clean Amber']
    },
    imageUrl: '/images/products/fleur-de-lune.png',
    images: [
      '/images/products/fleur-de-lune.png',
      '/images/products/cbfd.png'
    ],
    options: [
      { id: 'opt-fdl-30', sizeMl: 30, price: 125.00 },
      { id: 'opt-fdl-50', sizeMl: 50, price: 155.00 },
      { id: 'opt-fdl-100', sizeMl: 100, price: 195.00 }
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 128
  },
  {
    id: 'noir-cocoon',
    name: 'Noir Cocoon',
    brand: 'ODORATUS',
    description: 'An enigmatic veil of curing tobacco leaf, blackened amber resin, and Madagascar vanilla smoke.',
    price: 240.00,
    category: 'oriental',
    scentProfile: 'ORIENTAL / TOBACCO & AMBER',
    notes: {
      top: ['Smoked Plum', 'Black Cacao', 'Coriander Seed'],
      heart: ['Virginia Tobacco Leaf', 'Labdanum', 'Opoponax'],
      base: ['Blackened Amber', 'Vanilla Bourbon', 'Dark Patchouli']
    },
    imageUrl: '/images/products/noir-cocoon.png',
    images: [
      '/images/products/noir-cocoon.png',
      '/images/products/cbfd.png'
    ],
    options: [
      { id: 'opt-nc-30', sizeMl: 30, price: 150.00 },
      { id: 'opt-nc-50', sizeMl: 50, price: 190.00 },
      { id: 'opt-nc-100', sizeMl: 100, price: 240.00 }
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 96
  },
  {
    id: 'sol-dor',
    name: "Sol d'Or",
    brand: 'ODORATUS',
    description: 'Sun-warmed Mediterranean bergamot caught in the mineral spray of azure tides and crushed wild herbs.',
    price: 185.00,
    category: 'fresh',
    scentProfile: 'FRESH / BERGAMOT & SEA SALT',
    notes: {
      top: ['Calabrian Bergamot', 'Bitter Orange', 'Sea Breeze'],
      heart: ['Fleur de Sel', 'Wild Rosemary', 'Petitgrain'],
      base: ['Driftwood', 'Mineral Vetiver', 'White Amber']
    },
    imageUrl: '/images/products/sol-dor.png',
    images: [
      '/images/products/sol-dor.png',
      '/images/products/cbfd.png'
    ],
    options: [
      { id: 'opt-sd-30', sizeMl: 30, price: 115.00 },
      { id: 'opt-sd-50', sizeMl: 50, price: 145.00 },
      { id: 'opt-sd-100', sizeMl: 100, price: 185.00 }
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 162
  },
  {
    id: 'atelier-oud',
    name: 'Atelier Oud',
    brand: 'ODORATUS',
    description: 'Haute perfumery oud layered with Persian saffron threads, roasted tonka bean, and smoldering frankincense.',
    price: 310.00,
    category: 'woody',
    scentProfile: 'WOODY / RICH OUD & SAFFRON',
    notes: {
      top: ['Persian Saffron', 'Nutmeg', 'Cistus'],
      heart: ['Assam Oud', 'Damask Rose', 'Smoked Birch'],
      base: ['Frankincense Tears', 'Roasted Tonka', 'Castoreum Accord']
    },
    imageUrl: '/images/products/atelier-oud.png',
    images: [
      '/images/products/atelier-oud.png',
      '/images/products/cbfd.png'
    ],
    options: [
      { id: 'opt-ao-30', sizeMl: 30, price: 195.00 },
      { id: 'opt-ao-50', sizeMl: 50, price: 250.00 },
      { id: 'opt-ao-100', sizeMl: 100, price: 310.00 }
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 88
  },
  {
    id: 'rose-absolute',
    name: 'Rose Absolute',
    brand: 'ODORATUS',
    description: 'Centifolia roses harvested at first dawn in Grasse, anchored by Atlas cedarwood and powdery spun sugar.',
    price: 205.00,
    category: 'floral',
    scentProfile: 'FLORAL / DAMASK ROSE & CEDAR',
    notes: {
      top: ['May Rose Dew', 'Pink Peppercorn', 'Lychee'],
      heart: ['Damask Rose Absolute', 'Geranium', 'Peony'],
      base: ['Atlas Cedarwood', 'White Ambergris', 'Powdery Musk']
    },
    imageUrl: '/images/products/rose-absolute.png',
    images: [
      '/images/products/rose-absolute.png',
      '/images/products/cbfd.png'
    ],
    options: [
      { id: 'opt-ra-30', sizeMl: 30, price: 135.00 },
      { id: 'opt-ra-50', sizeMl: 50, price: 165.00 },
      { id: 'opt-ra-100', sizeMl: 100, price: 205.00 }
    ],
    inStock: true,
    rating: 4.7,
    reviewCount: 145
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = '/products';

  getProducts(): Observable<Product[]> {
    if (environment.enableMockFallback) {
      return of(MOCK_PRODUCTS);
    }

    return this.http.get<Product[]>(this.endpoint).pipe(
      catchError(() => of(MOCK_PRODUCTS))
    );
  }

  getProductById(id: string): Observable<Product | null> {
    if (environment.enableMockFallback) {
      const found = MOCK_PRODUCTS.find(p => p.id === id) ?? MOCK_PRODUCTS[0];
      return of(found);
    }

    return this.http.get<Product>(`${this.endpoint}/${id}`).pipe(
      catchError(() => {
        const found = MOCK_PRODUCTS.find(p => p.id === id) ?? MOCK_PRODUCTS[0];
        return of(found);
      })
    );
  }
}
