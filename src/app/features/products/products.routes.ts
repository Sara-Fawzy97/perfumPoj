import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/products-list/products-list.component').then(m => m.ProductsListComponent)
  },
  {
    path: ':productId',
    loadComponent: () =>
      import('./pages/product-details/product-details.component').then(m => m.ProductDetailsComponent)
  }
];
