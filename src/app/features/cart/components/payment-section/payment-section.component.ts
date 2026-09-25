import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PaymentMethod = 'card' | 'cod';

@Component({
  selector: 'app-payment-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-section.component.html'
})
export class PaymentSectionComponent {
  subtotal = input.required<number>();
  shipping = input.required<number>();
  total = input.required<number>();
  disabled = input<boolean>(false);

  placeOrder = output<{ paymentMethod: PaymentMethod }>();

  selectedPayment = signal<PaymentMethod>('card');

  selectPayment(method: PaymentMethod): void {
    this.selectedPayment.set(method);
  }

  onPlaceOrder(): void {
    this.placeOrder.emit({ paymentMethod: this.selectedPayment() });
  }

  formatCurrency(amount: number): string {
    return `${amount.toFixed(0)} USD`;
  }
}
