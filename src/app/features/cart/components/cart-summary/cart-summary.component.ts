import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PriceFormatPipe } from '../../../../shared/pipes/price-format.pipe';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule, ButtonComponent, PriceFormatPipe],
  templateUrl: './cart-summary.component.html'
})
export class CartSummaryComponent {
  subtotal = input<number>(0);
  shipping = input<number>(0);
  tax = input<number>(0);
  total = input<number>(0);
  disabled = input<boolean>(false);

  checkout = output<void>();

  onCheckout(): void {
    this.checkout.emit();
  }
}
