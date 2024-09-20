import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/categories.service';
import { Category } from 'src/app/core/models/category.model';
import { offset } from '@popperjs/core';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})

export class ListCategoriesComponent implements OnInit {

  categories: Category[] = [];

  constructor(private CategoryService: CategoryService) { }

  //INICIA 

  ngOnInit(): void {
    this.getCategories();
  }

  // TOTES LES CATEGORIES
  getCategories() {

    this.CategoryService.all_categories(undefined).subscribe(
      (data: any) => {
        this.categories = data.categories;
        console.log(this.categories);
      }
    );
  }

}