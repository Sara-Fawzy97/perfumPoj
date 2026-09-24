import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategory } from '../../models/product.model';

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-filters.component.html'
})
export class ProductFiltersComponent {
  selectedCategory = input<ProductCategory>('all');
  categoryChange = output<ProductCategory>();

  // Interactive selection states
  readonly selectedCollection = signal<string>('Pure Extractions');
  readonly selectedOccasions = signal<string[]>([]);
  readonly currentMaxPrice = signal<number>(400);

  readonly collections = [
    'Pure Extractions',
    'Private Reserve',
    'Atelier Oils',
    'Discovery Vault'
  ];

  readonly scentFamilies: { id: ProductCategory; label: string }[] = [
    { id: 'floral', label: 'Floral' },
    { id: 'woody', label: 'Woody' },
    { id: 'oriental', label: 'Oriental' },
    { id: 'fresh', label: 'Fresh' }
  ];

  readonly occasions = [
    'Personal Use',
    'Wedding',
    'Gift Sets',
    'Birthday'
  ];

  toggleCollection(name: string): void {
    if (this.selectedCollection() === name) {
      this.selectedCollection.set('');
    } else {
      this.selectedCollection.set(name);
    }
  }

  toggleScentFamily(id: ProductCategory): void {
    if (this.selectedCategory() === id) {
      this.categoryChange.emit('all');
    } else {
      this.categoryChange.emit(id);
    }
  }

  toggleOccasion(item: string): void {
    const list = this.selectedOccasions();
    if (list.includes(item)) {
      this.selectedOccasions.set(list.filter(x => x !== item));
    } else {
      this.selectedOccasions.set([...list, item]);
    }
  }

  onPriceChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.currentMaxPrice.set(Number(target.value));
  }
}
