import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../core/services/product.service';
import { CategoryService } from 'src/app/core/services/categories.service';
import { Product } from '../../core/models/product.model';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})

export class ListProductsComponent implements OnInit {

  //Declaracions
  routeFilters!: string | null;
  products: Product[] = [];
  slug_Category!: string | null;
  listCategories: Category[] = [];


  constructor(private productService: ProductService,
    private ActivatedRoute: ActivatedRoute,
    private CategoryService: CategoryService,
    private Location: Location
  ) { }

  //Lo que inicia
  ngOnInit(): void {
    console.log()
    this.slug_Category = this.ActivatedRoute.snapshot.paramMap.get('slug');

    if (this.slug_Category !== null) {
      this.get_products_by_cat();
    } else {
      this.get_products();
    }
  }

  //traer productos
  get_products() {

    this.productService.get_products().subscribe(
      (data: any) => {
        this.products = data.products;
        console.log(this.products);
      }
    );
  }

  get_products_by_cat(): void {
    if (this.slug_Category !== null) {
      console.log(this.slug_Category);
      this.productService.getProductsByCategory(this.slug_Category).subscribe(
        (data: any) => {
          this.products = data.products;
          console.log(data.products);
        });
    }
  }
}

