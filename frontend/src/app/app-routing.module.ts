import { RouterModule, Routes } from '@angular/router';
import { DetailsResolver } from './details/details-resolver.service';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'shop',
    loadComponent: () => import('./shop/shop.component').then(m => m.ShopComponent),
  },
  {
    path: 'categories/:slug', // Move this route to the root level
    loadComponent: () => import('./shared/list-products/list-products.component').then(m => m.ListProductsComponent)
  },
  {
    path: 'details/:slug',
    loadComponent: () => import('./details/details.component').then(m => m.DetailsComponent),
    // resolve: { product: DetailsResolver }
  },
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
