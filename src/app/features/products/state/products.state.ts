import { Injectable, inject, signal, computed } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, ProductCategory, ProductSortOption } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsState {
  private readonly productsService = inject(ProductsService);

  readonly products = signal<Product[]>([]);
  readonly searchQuery = signal<string>('');
  readonly selectedCategory = signal<ProductCategory>('all');
  readonly sortBy = signal<ProductSortOption>('featured');
  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  readonly filteredProducts = computed(() => {
    let list = [...this.products()];
    const query = this.searchQuery().trim().toLowerCase();
    const category = this.selectedCategory();
    const sort = this.sortBy();

    if (category !== 'all') {
      list = list.filter(p => p.category === category);
    }

    if (query) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.scentProfile.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        break;
    }

    return list;
  });

  loadProducts(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.productsService.getProducts().subscribe({
      next: (items) => {
        this.products.set(items);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load fragrance collection');
        this.isLoading.set(false);
      }
    });
  }

  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  setCategory(category: ProductCategory): void {
    this.selectedCategory.set(category);
  }

  setSortBy(sort: ProductSortOption): void {
    this.sortBy.set(sort);
  }
}
