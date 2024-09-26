import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/categories.service';
import { Category } from 'src/app/core/models/category.model';
import { CardCategoryComponent } from '../card-category/card-category.component';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css'],
  standalone: true,
  imports: [
    CardCategoryComponent,
    CommonModule,
    InfiniteScrollModule
  ],
  providers: [
    CategoryService
  ]
})

export class ListCategoriesComponent implements OnInit {

  offset = 0;
  limit = 3;
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  // TOTES LES CATEGORIES
  getCategories() {
    const params = this.getRequestParams(this.offset, this.limit);

    this.categoryService.all_categories(params).subscribe(
      (data: any) => {
        this.categories = data.categories;
        this.limit = this.limit + 4;
        // console.log(this.categories);
      }
    );
  }

  getRequestParams(offset: number, limit: number): any {
    let params: any = {};

    params[`offset`] = offset;
    params[`limit`] = limit;

    return params;
  }

  scroll() {
    this.getCategories();
  }
}