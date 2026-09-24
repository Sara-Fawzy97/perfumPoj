import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSortOption } from '../../models/product.model';

@Component({
  selector: 'app-product-sort',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-sort.component.html'
})
export class ProductSortComponent {
  selectedSort = input<ProductSortOption>('featured');
  sortChange = output<ProductSortOption>();

  onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortChange.emit(target.value as ProductSortOption);
  }
}
