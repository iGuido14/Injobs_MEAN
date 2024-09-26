import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ProductService } from '../../core/services/product.service';
import { CategoryService } from 'src/app/core/services/categories.service';
import { Product } from '../../core/models/product.model';
import { Category } from 'src/app/core/models/category.model';
import { CardProductComponent } from '../card-product/card-product.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FiltersComponent } from '../filters/filters.component';
import { Filters } from 'src/app/core/models/filters.model';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
  standalone: true,
  imports: [
    CardProductComponent,
    CommonModule,
    RouterLink,
    InfiniteScrollModule,
    FiltersComponent
  ],
  providers: [
    ProductService,
    CategoryService
  ]
})

export class ListProductsComponent implements OnInit {

  //Declaracions
  routeFilters!: string | null;
  products: Product[] = [];
  slug_Category!: string | null;
  listCategories: Category[] = [];
  filters = new Filters();
  offset: number = 0;
  limit: number = 3;
  totalPages: Array<number> = [];
  currentPage: number = 1;


  constructor(private productService: ProductService,
    private ActivatedRoute: ActivatedRoute,
    private CategoryService: CategoryService,
    private Location: Location
  ) { }

  //Lo que inicia
  ngOnInit(): void {
    console.log()
    this.slug_Category = this.ActivatedRoute.snapshot.paramMap.get('slug');
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');

    if (this.slug_Category !== null) {
      this.get_products_by_cat();
    } else {
      this.get_products();
    }
  }

  //traer productos
  get_products() {
    const params = this.getRequestParams(this.offset, this.limit);

    this.productService.get_products(params).subscribe(
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

  get_list_filtered(filters: Filters) {
    this.filters = filters;
    // console.log(JSON.stringify(this.filters));
    this.productService.get_products_filter(filters).subscribe(
      (data: any) => {
        this.products = data.products;
        this.totalPages = Array.from(new Array(Math.ceil(data.product_count / this.limit)), (val, index) => index + 1);
        console.log(this.products);
      });
  }

  getRequestParams(offset: number, limit: number): any {
    let params: any = {};

    params[`offset`] = offset;
    params[`limit`] = limit;

    return params;
  }

  scroll() {
    this.get_products();
  }
}

