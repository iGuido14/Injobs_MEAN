import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../core/models/product.model';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
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

    this.route.data.subscribe(
      (data: any) => {
        this.slug = data.product.products.slug;
        this.product = data.product.products;
        // console.log(this.slug);
      }
    );
  }
}
