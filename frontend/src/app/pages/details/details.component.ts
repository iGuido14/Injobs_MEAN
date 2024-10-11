import { ChangeDetectorRef, Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';

import { Product, Profile, User } from '../../core/models';
// import { ProductService } from '../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from 'src/app/shared/carousel/carousel.component';
import { UserService } from 'src/app/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommentsService } from 'src/app/core/services/comment.service';
import { Comment } from 'src/app/core/models/comment.model';
import { CommentsComponent } from 'src/app/shared/comments/comments.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CarouselComponent,
    CommentsComponent,
    ReactiveFormsModule,
  ]
})

export class DetailsComponent implements OnInit {

  product!: Product;
  author!: Profile;
  slug!: string | null;
  error: string | null = null;
  user_image!: string;
  canModify!: boolean;
  comments!: Comment[];
  commentControl = new FormControl();
  commentFormErrors!: {};
  NoComments!: boolean;
  currentUser: User;
  isLogged!: boolean;
  isSubmitting!: boolean;

  constructor(
    private commentService: CommentsService,
    // private productService: ProductService,
    private route: ActivatedRoute,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.route.data.subscribe(
      (data: any) => {
        this.slug = data.product.products.slug;
        this.product = data.product.products;
        this.author = data.product.products.author
        this.get_comments(this.slug);
        this.get_user_author();
        if (this.currentUser.username === this.author.username) {
          this.canModify = true;
        } else {
          this.canModify = false;
        }
      }
    );

    this.userService.isAuthenticated.subscribe((data) => {
      this.isLogged = data;
      console.log('is Logged: ', this.isLogged);
    });

    this.cd.markForCheck();

    const commentBody = this.commentControl.value;
    console.log(commentBody, this.product.slug);
  } // FIN ONINIT

  get_user_author() {
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        this.user_image = this.currentUser.image;
        // this.canModify = true;
      }
    );
  }

  // LIKES
  onToggleFavorite(favorited: boolean) {
    this.product.favorited = favorited;
    console.log("hola", this.product.favorited);

    if (favorited) {
      this.product.favoritesCount++;
    } else {
      this.product.favoritesCount--;
    }
  }

  onToggleFollow(following: boolean) {
    this.author.following = following;
    // console.log(this.author.following);
  }

  //COMMENTS
  get_comments(product_slug: any) {
    // console.log(product_slug);
    if (product_slug) {
      this.commentService.getAll(product_slug).subscribe((comments) => {
        this.comments = comments;
        // console.log(this.comments.length);
        if (this.comments.length === 0) {
          console.log("No comments");
          this.NoComments = true;
        } else {
          this.NoComments = false;
        }
      });
    }
  }

  create_comment() {
    // console.log(`hola`);
    this.isSubmitting = true;
    this.commentFormErrors = {};
    // console.log(this.commentControl.value);
    if (this.slug) {
      const commentBody = this.commentControl.value;
      console.log(commentBody);
      // console.log(this.slug);
      this.commentService.add(this.slug, { body: commentBody }).subscribe(
        data => {
          console.log(data);
          // console.log("Comment added successfully");
          this.commentControl.reset('');
          this.isSubmitting = false;
          this.comments.push(data);
          window.location.reload();
        },
        err => {
          console.log(err);
          this.error = err;
          this.isSubmitting = false;
          this.cd.markForCheck();
        }
      );
    } else {
      console.log(`no hay slug `);
    }
  }

  delete_comment(comment: Comment) {
    // console.log(comment.id);

    if (this.product.slug) {

      this.commentService.destroy(comment.id, this.slug).subscribe(
        (data: any) => {
          // console.log(data);
          console.log("Comment deleted successfully");

          // this.ToastrService.success("Comment deleted successfully");
          console.log(this.comments);
          this.comments = this.comments.filter((item) => item !== comment);
        });
    }
  }

  empty_comment() {
    this.commentControl.reset('');
    this.isSubmitting = false;
  }
}