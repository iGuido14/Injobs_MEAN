import { RouterLink, RouterModule } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductService, UserService } from 'src/app/core';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './companyDashboard.component.html',
  styleUrls: ['./companyDashboard.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    CommonModule,
  ]
})

export class companyDashboardComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const user = this.userService.getCurrentUser();

    this.productService.get_products_company(user.username).subscribe((data: Product[]) => {
      console.log(data);
      this.products = data;
    })
  }

}
