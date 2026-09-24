import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

export interface CheckoutPayload {
  items: CartItem[];
  customerEmail?: string;
}

export interface CheckoutResult {
  orderId: string;
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = '/checkout';

  checkout(payload: CheckoutPayload): Observable<CheckoutResult> {
    // Service boundary prepared for backend integration
    return of({
      orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      success: true,
      message: `Order initiated successfully for ${payload.items.length} item(s).`
    });
  }
}
