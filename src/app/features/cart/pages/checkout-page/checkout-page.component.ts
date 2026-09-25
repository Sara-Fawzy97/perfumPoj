import { Component, inject, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartState } from '../../state/cart.state';
import { CartService } from '../../services/cart.service';
import { CheckoutFormComponent } from '../../components/checkout-form/checkout-form.component';
import { PaymentSectionComponent, PaymentMethod } from '../../components/payment-section/payment-section.component';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CheckoutFormComponent,
    PaymentSectionComponent
  ],
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent {
  readonly cartState = inject(CartState);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  readonly checkoutForm = viewChild.required(CheckoutFormComponent);

  isPlacingOrder = false;

  onPlaceOrder(event: { paymentMethod: PaymentMethod }): void {
    const form = this.checkoutForm();
    if (!form.isValid()) {
      return;
    }

    this.isPlacingOrder = true;
    const delivery = form.getFormValue();

    // Snapshot cart totals before clearing
    const items = [...this.cartState.items()];
    const subtotal = this.cartState.subtotal();
    const shipping = this.cartState.shipping();
    const total = this.cartState.total();

    this.cartService.checkout({ items, customerEmail: undefined }).subscribe({
      next: (result) => {
        const whatsappUrl = this.buildWhatsAppUrl(
          delivery,
          event.paymentMethod,
          result.orderId,
          items,
          subtotal,
          shipping,
          total
        );

        // Clear cart first, then navigate + open WhatsApp
        this.cartState.clearCart();
        this.router.navigate(['/products']);
        window.open(whatsappUrl, '_blank');
      },
      error: () => {
        this.isPlacingOrder = false;
      }
    });
  }

  private buildWhatsAppUrl(
    delivery: ReturnType<CheckoutFormComponent['getFormValue']>,
    paymentMethod: PaymentMethod,
    orderId: string,
    items: CartItem[],
    subtotal: number,
    shipping: number,
    total: number
  ): string {
    const paymentLabel = paymentMethod === 'card' ? 'Credit / Debit Card' : 'Cash on Delivery';

    const itemLines = items
      .map(
        (item, i) =>
          `  ${i + 1}. ${item.name} (${item.brand}) — ${item.sizeMl}ml x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`
      )
      .join('\n');

    const messageParts: string[] = [
      `🛍️ *New Order — ${orderId}*`,
      ``,
      `👤 *Customer Details*`,
      `  Name: ${delivery.recipientName}`,
      `  Phone: ${delivery.phoneNumber}`,
      `  Address: ${delivery.deliveryAddress}`,
      `  City: ${delivery.city}`,
      `  Postal Code: ${delivery.postalCode}`,
    ];

    if (delivery.deliveryNote) {
      messageParts.push(`  Note: ${delivery.deliveryNote}`);
    }

    messageParts.push(
      ``,
      `🧴 *Order Items*`,
      itemLines,
      ``,
      `💰 *Order Summary*`,
      `  Subtotal: $${subtotal.toFixed(2)}`,
      `  Delivery: ${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}`,
      `  *Total: $${total.toFixed(2)}*`,
      ``,
      `💳 *Payment Method:* ${paymentLabel}`
    );

    const message = messageParts.join('\n');
    return `https://wa.me/01141553843?text=${encodeURIComponent(message)}`;
  }
}
