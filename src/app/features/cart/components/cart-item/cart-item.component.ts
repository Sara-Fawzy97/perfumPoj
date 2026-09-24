import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../models/cart-item.model';
import { PriceFormatPipe } from '../../../../shared/pipes/price-format.pipe';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, RouterLink, PriceFormatPipe],
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent {
  item = input.required<CartItem>();

  quantityChange = output<number>();
  remove = output<void>();

  onDecrement(): void {
    this.quantityChange.emit(-1);
  }

  onIncrement(): void {
    this.quantityChange.emit(1);
  }

  onRemove(): void {
    this.remove.emit();
  }
}
