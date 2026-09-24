import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartState } from '../../state/cart.state';
import { CartService } from '../../services/cart.service';
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
  private readonly cartService = inject(CartService);

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
    this.cartService.checkout({ items: this.cartState.items() }).subscribe(result => {
      alert(`Order Placed: ${result.orderId} - ${result.message}`);
      this.cartState.clearCart();
    });
  }
}
