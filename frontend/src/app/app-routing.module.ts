import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './shared/carousel/carousel.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
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
