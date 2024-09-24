import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Product } from '../core/models/product.model';
import { ProductService } from '../core/services/product.service';
import { CommonModule } from '@angular/common';
import { DetailsResolver } from './details-resolver.service';

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
    DetailsResolver
  ]
})

export class DetailsComponent {

  product!: Product;
  slug!: string | null;

  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    // private ToastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.slug = this.ActivatedRoute.snapshot.paramMap.get('slug');
    console.log(this.slug);
    console.log(this.route.data);

    this.route.data.subscribe(
      (data: any) => {
        console.log(`hola`);
        this.slug = data.product.products.slug;
        this.product = data.product.products;
        // console.log(this.route.data);
        // console.log(`hola`);
      }
    );
  }
}