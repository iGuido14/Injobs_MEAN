import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnChanges } from '@angular/core';
import { register } from 'swiper/element/bundle'; // Import for registering Swiper's custom elements
import { CarouselHome, CarouselDetails } from 'src/app/core/models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel-items',
  templateUrl: './carousel-items.component.html',
  styleUrls: ['./carousel-items.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class CarouselItemsComponent implements OnChanges {

  @Input() categories!: CarouselHome[];
  @Input() products_details!: CarouselDetails[];
  @Input() page!: String;

  selectIndex = 0;
  selectIndex_product_img = 0;

  constructor() { }

  ngOnChanges(): void {
    // register();
    // console.log(this.page);
    // console.log(this.categories);
    console.log(this.products_details);
  }
}
