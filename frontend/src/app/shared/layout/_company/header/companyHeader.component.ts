import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User, UserService } from 'src/app/core';
import { ShowAuthedDirective } from '../../../show-authed.directive';

@Component({
  selector: 'app-header-company',
  templateUrl: './companyHeader.component.html',
  styleUrls: ['./companyHeader.component.css'],
  standalone: true,
  imports: [
    // Router
    CommonModule,
    RouterLink,
    ShowAuthedDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class companyHeaderComponent implements OnInit {

  currentUser: User;

  constructor(
    // private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    // console.log(this.currentUser);
    this.userService.currentUser.subscribe((userData) => {
      // console.log(userData);
      this.currentUser = userData;
      this.cd.markForCheck();
    }
    );
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }
}
