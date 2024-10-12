import { Component, OnInit, Input, } from '@angular/core';
// import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoriteButtonComponent } from '../buttons/favorite-button/favorite-button.component';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FavoriteButtonComponent
  ],

})

export class CardProductComponent implements OnInit {

  @Input() product: Product = {} as Product;

  constructor() { }

  ngOnInit(): void { }

  onToggleFavorite(favorited: boolean) {
    this.product.favorited = favorited;

    if (favorited) {
      this.product.favoritesCount++;
    } else {
      this.product.favoritesCount--;
    }
  }
}
