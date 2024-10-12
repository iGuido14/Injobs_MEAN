import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { concatMap, of, tap } from 'rxjs';


@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class FavoriteButtonComponent implements OnInit {

  @Input() product: Product = {} as Product;
  @Output() toggle = new EventEmitter<boolean>();

  isSubmitting = false;
  isLoged: Boolean = false;
  isLiked: Boolean = false;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // this.toggleFavorite();
  }

  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }

        // Favorite the article if it isn't favorited yet
        if (!this.product.favorited) {
          return this.productService.favorite(this.product.slug)
            .pipe(tap(
              data => {
                this.isSubmitting = false;
                this.isLiked = false
                this.toggle.emit(true);
              },
              err => this.isSubmitting = false
            ));

          // Otherwise, unfavorite the article
        } else {
          return this.productService.unfavorite(this.product.slug)
            .pipe(tap(
              data => {
                this.isSubmitting = false;
                this.isLiked = true;
                this.toggle.emit(false);
              },
              err => this.isSubmitting = false
            ));
        }

      }
    )).subscribe(() => {
      // console.log(`hola`);
      this.cd.markForCheck();
      return this.isLiked
    });
  }
}