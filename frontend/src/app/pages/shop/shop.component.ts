import { Component } from '@angular/core';
import { ListProductsComponent } from '../../shared/list-products/list-products.component';
import { Routes, RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  standalone: true,
  imports: [
    ListProductsComponent,
    RouterLink
  ]
})

export class ShopComponent { }

// const routes: Routes = [
//   {
//     path: '',
//     component: ShopComponent,
//     resolve: {},
//   },
//   {
//     path: 'categories/:slug',
//     component: ShopComponent,
//     resolve: {},
//   },
// ];

// export const ShopRoutingModule = RouterModule.forChild(routes);