import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsState } from '../../state/products.state';
import { CartState } from '../../../cart/state/cart.state';
import { Product, ProductCategory, ProductSortOption } from '../../models/product.model';
import { ProductFiltersComponent } from '../../components/product-filters/product-filters.component';
import { ProductSortComponent } from '../../components/product-sort/product-sort.component';
import { ProductGridComponent } from '../../components/product-grid/product-grid.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProductFiltersComponent,
    ProductSortComponent,
    ProductGridComponent
  ],
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {
  readonly productsState = inject(ProductsState);
  private readonly cartState = inject(CartState);

  readonly currentPage = signal<number>(1);
  readonly totalPages = signal<number>(4);

  ngOnInit(): void {
    if (this.productsState.products().length === 0) {
      this.productsState.loadProducts();
    }
  }

  onCategoryChange(category: ProductCategory): void {
    this.productsState.setCategory(category);
  }

  onSortChange(sort: ProductSortOption): void {
    this.productsState.setSortBy(sort);
  }

  onPrevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  onNextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  onAddToCart(product: Product): void {
    const defaultOption = product.options[0] ?? { sizeMl: 100, price: product.price };
    this.cartState.addItem({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      scentProfile: product.scentProfile,
      price: defaultOption.price,
      imageUrl: product.imageUrl,
      sizeMl: defaultOption.sizeMl
    });
  }
}
