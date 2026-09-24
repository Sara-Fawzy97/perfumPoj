import { Component, OnInit, input, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CartState } from '../../../cart/state/cart.state';
import { Product, ProductOption } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {
  productId = input<string>();

  private readonly productsService = inject(ProductsService);
  private readonly cartState = inject(CartState);

  readonly product = signal<Product | null>(null);
  readonly selectedOption = signal<ProductOption | null>(null);
  readonly selectedImage = signal<string>('');
  readonly quantity = signal<number>(1);
  readonly giftWrapping = signal<boolean>(true);
  readonly isLoading = signal<boolean>(true);
  readonly isAdded = signal<boolean>(false);
  readonly companions = signal<Product[]>([]);

  readonly currentPrice = computed(() => {
    return this.selectedOption()?.price ?? this.product()?.price ?? 0;
  });

  readonly totalPrice = computed(() => {
    return this.currentPrice() * this.quantity();
  });

  ngOnInit(): void {
    const id = this.productId();
    this.loadProduct(id || 'santal-parchment');
  }

  loadProduct(id: string): void {
    this.isLoading.set(true);
    this.productsService.getProductById(id).subscribe(item => {
      this.product.set(item);
      if (item) {
        this.selectedImage.set(item.imageUrl);
        // Default to the 100ml option as shown in Figma
        const defaultOpt = item.options.find(o => o.sizeMl === 100) ?? item.options[item.options.length - 1] ?? null;
        this.selectedOption.set(defaultOpt);
      }
      this.isLoading.set(false);
    });

    // Load olfactory companions (related fragrances)
    this.productsService.getProducts().subscribe(items => {
      const filtered = items.filter(p => p.id !== id).slice(0, 4);
      this.companions.set(filtered);
    });
  }

  selectOption(opt: ProductOption): void {
    this.selectedOption.set(opt);
  }

  selectImage(img: string): void {
    this.selectedImage.set(img);
  }

  toggleGiftWrapping(): void {
    this.giftWrapping.update(v => !v);
  }

  incrementQuantity(): void {
    this.quantity.update(q => q + 1);
  }

  decrementQuantity(): void {
    this.quantity.update(q => (q > 1 ? q - 1 : 1));
  }

  onAddToCart(): void {
    const prod = this.product();
    const opt = this.selectedOption();
    if (!prod || !opt || !prod.inStock) {
      return;
    }

    this.cartState.addItem({
      productId: prod.id,
      name: prod.name,
      brand: prod.brand,
      scentProfile: prod.scentProfile,
      price: opt.price,
      imageUrl: prod.imageUrl,
      sizeMl: opt.sizeMl
    }, this.quantity());

    this.isAdded.set(true);
    setTimeout(() => this.isAdded.set(false), 2000);
  }

  onCompanionAddToCart(companion: Product): void {
    const defaultOption = companion.options[0] ?? { sizeMl: 100, price: companion.price };
    this.cartState.addItem({
      productId: companion.id,
      name: companion.name,
      brand: companion.brand,
      scentProfile: companion.scentProfile,
      price: defaultOption.price,
      imageUrl: companion.imageUrl,
      sizeMl: defaultOption.sizeMl
    });
  }
}
