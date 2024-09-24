// import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
// import { register } from 'swiper/element/bundle';
// import { Category } from 'src/app/core/models/category.model';
// import { CommonModule } from '@angular/common';
// import { CarouselHome, CarouselDetails } from 'src/app/core/models/carousel.model';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-carousel-items',
//   templateUrl: './carousel-items.component.html',
//   styleUrls: ['./carousel-items.component.css'],
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterLink
//   ],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA],
// })
// export class CarouselItemsComponent {

//   @Input() categories!: CarouselHome[];
//   @Input() products_details!: CarouselDetails[];
//   @Input() page!: String;


//   selectIndex = 0;
//   selectIndex_product_img = 0;

//   constructor() { }
//   ngOnInit(): void {
//   }

// }


import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle'; // Import for registering Swiper's custom elements
import { CarouselHome, CarouselDetails } from 'src/app/core/models/carousel.model'; // Import your models
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carousel-items',
  templateUrl: './carousel-items.component.html',
  styleUrls: ['./carousel-items.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // This allows for the use of custom elements like <swiper-container>
})
export class CarouselItemsComponent implements OnInit {

  @Input() categories!: CarouselHome[];
  @Input() products_details!: CarouselDetails[];
  @Input() page!: String;

  selectIndex = 0;
  selectIndex_product_img = 0;

  constructor() { }

  ngOnInit(): void {
    register();
  }
}
