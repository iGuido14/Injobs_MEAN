import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/categories.service';
import { Category } from 'src/app/core/models/category.model';
import { CardCategoryComponent } from '../card-category/card-category.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css'],
  standalone: true,
  imports: [
    CardCategoryComponent,
    CommonModule
  ],
  providers: [
    CategoryService
  ]
})

export class ListCategoriesComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  // TOTES LES CATEGORIES
  getCategories() {

    this.categoryService.all_categories(undefined).subscribe(
      (data: any) => {
        this.categories = data.categories;
        console.log(this.categories);
      }
    );
  }

}