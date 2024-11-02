import { RouterLink, RouterModule } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductService, UserService } from 'src/app/core';
import { ApplicationService } from 'src/app/core/services/application.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-application-list',
  templateUrl: './applicationList.component.html',
  styleUrls: ['./applicationList.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    CommonModule,
  ]
})

export class applicationListComponent implements OnInit {
  applications: any[] = [];

  constructor(
    private applicationService: ApplicationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.refreshApplications();
  }

  private refreshApplications() {
    const user = this.userService.getCurrentUser();

    this.applicationService.get_applications(user.username).subscribe((data: Product[]) => {
      console.log(data);
      this.applications = data;
    });
  }

  acceptApplication(slug: String) {
    this.applicationService.accept_application(slug).subscribe({
      next: (data) => {
        Swal.fire('Accepted!', 'The application has been accepted.', 'success');
        this.refreshApplications();
      },
      error: (err) => {
        Swal.fire('Error', 'Failed to accept the application. Please try again.', 'error');
        console.error(err);
      }
    });
  }

  discardApplication(slug: String) {
    this.applicationService.discard_application(slug).subscribe({
      next: (data) => {
        Swal.fire('Discarded!', 'The application has been discarded.', 'success');
        this.refreshApplications();
      },
      error: (err) => {
        Swal.fire('Error', 'Failed to discard the application. Please try again.', 'error');
        console.error(err);
      }
    });
  }
}
