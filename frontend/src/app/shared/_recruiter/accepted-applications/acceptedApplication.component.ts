import { RouterLink, RouterModule } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductService, UserService } from 'src/app/core';
import { ApplicationService } from 'src/app/core/services/application.service';

@Component({
  selector: 'app-accepted-applications',
  templateUrl: './acceptedApplication.component.html',
  styleUrls: ['./acceptedApplication.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    CommonModule,
  ]
})

export class acceptedApplicationComponent implements OnInit {
  applications: any[] = [];

  constructor(
    private applicationService: ApplicationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const user = this.userService.getCurrentUser();

    this.applicationService.get_applications(user.username).subscribe((data: Product[]) => {
      console.log(data);
      this.applications = data;
    })
  }

}
