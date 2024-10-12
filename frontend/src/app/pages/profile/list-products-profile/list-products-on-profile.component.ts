import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-list-products-on-profile',
  templateUrl: './list-products-on-profile.component.html',
  styleUrls: ['./list-products-on-profile.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class ListProductsOnProfileComponent {

  @Input() products: Product = {} as Product;
  @Input() favorite: Product = {} as Product;

  @Input() pages_profile!: string;

  constructor() { }

  ngOnInit(): void {
    // Assuming `this.products.img` holds the image file name, e.g., 'product1.jpg'
    this.products.img = `assets/img_products/${this.products.img}`;
    this.favorite.img = `assets/img_products/${this.products.img}`;
    // console.log(this.products);
  }

}
