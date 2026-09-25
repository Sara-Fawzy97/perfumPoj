import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartState } from '../../state/cart.state';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { CartSummaryComponent } from '../../components/cart-summary/cart-summary.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink, CartItemComponent, CartSummaryComponent, ButtonComponent],
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent {
  readonly cartState = inject(CartState);
  private readonly router = inject(Router);

  onQuantityChange(productId: string, sizeMl: number, delta: number): void {
    this.cartState.updateQuantity(productId, sizeMl, delta);
  }

  onRemoveItem(productId: string, sizeMl: number): void {
    this.cartState.removeItem(productId, sizeMl);
  }

  onClearCart(): void {
    this.cartState.clearCart();
  }

  onCheckout(): void {
    this.router.navigate(['/cart/checkout']);
  }
}
