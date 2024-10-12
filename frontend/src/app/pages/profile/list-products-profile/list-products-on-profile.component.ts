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

  ngOnInit(): void { }

}
