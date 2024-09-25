import { RouterModule, Routes } from '@angular/router';
import { DetailsResolver } from './core/services/details-resolver.service';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'shop',
    loadComponent: () => import('./pages/shop/shop.component').then(c => c.ShopComponent),
  },
  {
    path: 'shop/categories/:slug',
    loadComponent: () => import('./shared/list-products/list-products.component').then(c => c.ListProductsComponent)
  },
  {
    path: 'details/:slug',
    loadComponent: () => import('./pages/details/details.component').then(c => c.DetailsComponent),
    resolve: { product: DetailsResolver }
  }

]