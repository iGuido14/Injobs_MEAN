import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { CardCategoryComponent } from '../shared/card-category/card-category.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    ListCategoriesComponent,
    CardCategoryComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ListCategoriesComponent,
    CardCategoryComponent
  ]
})

export class SharedModule { }
