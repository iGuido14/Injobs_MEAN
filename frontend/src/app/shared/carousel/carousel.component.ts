import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent {

  // items_carousel!: CarouselHome[];
  // items_details!: CarouselDetails[];
  // slug_details!: string | null;
  // page!: String;

  // constructor(private CarouselService: CarouselService, private productService: ProductService, private ActivatedRoute: ActivatedRoute,) { }

  // ngOnInit(): void {
  //   this.slug_details = this.ActivatedRoute.snapshot.paramMap.get('slug');
  //   this.carousel_categories();
  //   this.carousel_shop_details();
  // }

  // carousel_categories(): void {
  //   this.page = "categories";
  //   this.CarouselService.getCarouselHome().subscribe(((data: any) => {
  //     // console.log(data);
  //     this.items_carousel = data.categories;
  //   }))
  // }
  // carousel_shop_details(): void {
  //   if (this.slug_details) {
  //     this.page = "details";
  //     this.CarouselService.getCarouselDetails(this.slug_details).subscribe(((data: any) => {
  //       // console.log(data);
  //       this.items_details = data.products.images;
  //       // console.log(this.items_details);
  //     }))
  //   }
  // }
}
