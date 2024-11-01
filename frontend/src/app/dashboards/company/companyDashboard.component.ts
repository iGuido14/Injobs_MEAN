import { RouterLink, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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

export class companyDashboardComponent {

}
