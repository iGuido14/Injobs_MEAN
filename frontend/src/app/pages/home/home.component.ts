import { RouterLink, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCategoriesComponent } from '../../shared/list-categories/list-categories.component';
import { CardCategoryComponent } from '../../shared/card-category/card-category.component';
import { appRoutes } from '../../app.routes';
import { CarouselComponent } from '../../shared/carousel/carousel.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    CommonModule,
    ListCategoriesComponent,
    CardCategoryComponent,
    CarouselComponent
  ]
})
export class HomeComponent {

}
