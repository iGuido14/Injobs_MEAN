import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  providers: [
    ProductService,
  ]
})

export class DetailsComponent implements OnInit {

  product!: Product;
  slug!: string | null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.data.subscribe(
      (data: any) => {
        this.slug = data.product.products.slug;
        this.product = data.product.products;
        console.log(data.product.products);
      }
    );
  }
}