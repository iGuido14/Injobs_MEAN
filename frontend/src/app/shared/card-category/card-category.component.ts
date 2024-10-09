import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from 'src/app/core/models';

@Component({
  selector: 'app-card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
})

export class CardCategoryComponent implements OnInit {

  // @Input() categories: Category = {} as Category;
  @Input() category: Category = {} as Category;

  constructor() { }

  ngOnInit(): void {
    // console.log('Category Name:', this.category);
    // console.log(this.category.image);
  }
}