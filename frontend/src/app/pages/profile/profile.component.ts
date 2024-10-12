import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

import { User, UserService, Profile, Product, ProfilesService } from '../../core';
import { FollowButtonComponent } from 'src/app/shared/buttons/follow-button/follow-button.component';
import { FollowListComponent } from 'src/app/pages/profile/follow-list/follow-list.component';
import { CommonModule } from '@angular/common';
import { concatMap, map, tap } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    FollowButtonComponent,
    FollowListComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  username!: string | null;
  pages_profile: string = "products";
  settings_buttons!: boolean;
  username_user: any;
  img: any;
  bio: any;
  num_followers: any;
  num_follows: any;
  author: Profile;
  profile: Profile;
  followers: Profile[] = [{ username: '', bio: '', image: '' }];
  follow: Profile[] = [{ username: '', bio: '', image: '' }];
  isUser: boolean;
  currentUser: User;
  username_profile: any;
  product: Product[] = [];

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private profileService: ProfilesService,
    private userService: UserService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.route.data.pipe(concatMap((data: { profile: Profile }) => {
      this.profile = data.profile;

      this.followers = data.profile.followerList;
      this.follow = data.profile.followList;
      console.log(data.profile);

      // Load the current user's data.
      return this.userService.currentUser.pipe(tap(
        (userData: User) => {
          this.currentUser = userData;
          this.isUser = (this.currentUser.username === this.profile.username);
        }
      ));
    })).subscribe((() => {
      this.cd.markForCheck();
    }));



    // this.username = this.ActivatedRoute.snapshot.paramMap.get('username');
    // // console.log(this.username);

    // this.profileService.get(this.username).subscribe(
    //   (data: any) => {

    //     this.profile = data;
    //     console.log(this.profile);

    //     this.product = data.products
    //     this.followers = data.followers
    //     this.follow = data.follows

    //     console.log(data.profile);
    //     console.log(this.follow);
    //     this.author = data.profile;

    //   });

    // this.userService.currentUser.subscribe({
    //   next: data => this.isUser = data,
    // });

    // if (this.isUser.username === this.username) {
    //   this.settings_buttons = true
    // } else {
    //   this.settings_buttons = false
    // }
  }


  onToggleFollow(following: boolean) {
    this.author.following = following;

    if (following) {
      this.author.n_followers++;
    } else {
      this.author.n_followers--;
    }
  }

  change_followers() {
    this.pages_profile = "followers";
  }
  change_follows() {
    this.pages_profile = "follows";
  }
  change_products() {
    this.pages_profile = "products";
  }
}




