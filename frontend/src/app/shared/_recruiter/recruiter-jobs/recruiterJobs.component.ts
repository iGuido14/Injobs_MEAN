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
    this.productService.get_recruiter_products().subscribe((data: Product[]) => {
      console.log(data);
      this.products = data;
    })
  }

  acceptJob(slug: string) {
    const body = {
      isAccepted: true
    };

    this.productService.update_recruiter_product(slug, body).subscribe(
      (data: any) => {
        console.log(data);

        // Show success notification with SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'The action has been done!',
          confirmButtonText: 'OK'
        }).then(() => {
          // This block executes when the user clicks "OK" on the Swal alert
          this.productService.get_recruiter_products().subscribe((products: Product[]) => {
            console.log(products);
            this.products = products;
          });
        });
      },
      (error) => {
        console.error(error);

        // Show error notification with SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while processing the action.',
          confirmButtonText: 'Try Again'
        });
      }
    );
  }


  discardJob(slug: string) {
    const body = {
      isAccepted: true,
      isClosed: true
    };

    this.productService.update_recruiter_product(slug, body).subscribe(
      (data: any) => {
        console.log(data);

        // Show success notification with SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Success',
          confirmButtonText: 'OK'
        }).then(() => {
          // This block executes when the user clicks "OK" on the Swal alert
          this.productService.get_recruiter_products().subscribe((products: Product[]) => {
            console.log(products);
            this.products = products;
          });
        });
      },
      (error) => {
        console.error(error);

        // Show error notification with SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while processing the action.',
          confirmButtonText: 'Try Again'
        });
      }
    );
  }

}
