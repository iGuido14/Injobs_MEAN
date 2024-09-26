import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { CardCategoryComponent } from '../shared/card-category/card-category.component';

import { ListProductsComponent } from '../shared/list-products/list-products.component';
import { CardProductComponent } from '../shared/card-product/card-product.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ListCategoriesComponent,
    CardCategoryComponent,
    ListProductsComponent,
    CardProductComponent,
  ],
  exports: [
    ListCategoriesComponent,
    CardCategoryComponent,
    ListProductsComponent,
    CardProductComponent,
  ]
})

export class SharedModule { }
