import { RouterModule, Routes } from '@angular/router';
import { DetailsResolver } from './pages/details/details-resolver.service';

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
    path: 'categories/:slug', // Move this route to the root level
    loadComponent: () => import('./shared/list-products/list-products.component').then(c => c.ListProductsComponent)
  },
  {
    path: 'details/:slug',
    loadComponent: () => import('./pages/details/details.component').then(c => c.DetailsComponent),
    resolve: { product: DetailsResolver }
  }
]

//   const routes: Routes = [
//     {
//       path: '',
//       loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
//     },
//     {
//       path: 'home',
//       loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
//     },
//     {
//       path: 'shop',
//       loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
//     },
//     {
//       path: 'details',
//       loadChildren: () => import('./details/details.module').then(m => m.DetailsModule)
//     },
//   ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
