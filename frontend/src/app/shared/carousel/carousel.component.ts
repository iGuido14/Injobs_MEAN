import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { register } from 'swiper/element/bundle';
import { CarouselItemsComponent } from '../carousel-items/carousel-items.component';
import { CarouselHome, CarouselDetails } from 'src/app/core/models';
import { CarouselService } from 'src/app/core/services/carousel.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  standalone: true,
  imports: [
    CarouselItemsComponent,
  ],
  providers: [
    CarouselService,
    ProductService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent {

  items_carousel!: CarouselHome[];
  items_details!: CarouselDetails[];
  slug_details!: string | null;
  page!: String;

  constructor(private CarouselService: CarouselService, private productService: ProductService, private ActivatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    register();

    this.slug_details = this.ActivatedRoute.snapshot.paramMap.get('slug');
    this.load_carousel();
  }

  load_carousel(): void {
    if (!this.slug_details) {
      // console.log(`home`);
      this.page = `home`;
      this.CarouselService.getCarouselHome().subscribe(((data: any) => {
        // console.log(data);
        this.items_carousel = data.categories;
        // console.log(this.items_carousel);
      }))
    } else {
      console.log(`details`);
      this.page = "details";
      this.CarouselService.getCarouselDetails(this.slug_details).subscribe(((data: any) => {
        // console.log(data);
        this.items_details = data.products.images;
        // console.log(this.items_details);
      }))
    }
  }
}
