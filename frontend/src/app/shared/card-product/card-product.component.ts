import { Component, OnInit, Input, } from '@angular/core';
// import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],

})

export class CardProductComponent implements OnInit {

  @Input() product: Product = {} as Product;

  constructor() { }

  ngOnInit(): void {

  }

}
