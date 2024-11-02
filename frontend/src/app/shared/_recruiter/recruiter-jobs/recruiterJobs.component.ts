import { Router, RouterLink, RouterModule } from '@angular/router';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductService, UserService } from 'src/app/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recruiter-jobs',
  templateUrl: './recruiterJobs.component.html',
  styleUrls: ['./recruiterJobs.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    CommonModule,
  ]
})

export class recruiterJobsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.refreshProducts();
  }

  private refreshProducts() {
    this.productService.get_recruiter_products().subscribe((data: Product[]) => {
      console.log(data);
      this.products = data;
    });
  }

  acceptJob(slug: string) {
    const body = {
      isAccepted: true
    };

    this.productService.update_recruiter_product(slug, body).subscribe({
      next: (data: any) => {
        Swal.fire('Accepted!', 'The job has been accepted!', 'success');
        this.refreshProducts();
      },
      error: (err) => {
        Swal.fire('Error', 'An error occurred while processing the action', 'error');
      }
    });
  }


  discardJob(slug: string) {
    const body = {
      isAccepted: true,
      isClosed: true
    };

    this.productService.update_recruiter_product(slug, body).subscribe({
      next: (data: any) => {
        Swal.fire('Accepted!', 'The job has been discarded!', 'success');
        this.refreshProducts();
      },
      error: (err) => {
        Swal.fire('Error', 'An error occurred while processing the action', 'error');
      }
    });
  }

}
