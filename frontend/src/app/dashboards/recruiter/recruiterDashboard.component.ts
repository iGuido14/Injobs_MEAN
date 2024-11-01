import { RouterLink, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recruiter-dashboard',
  templateUrl: './recruiterDashboard.component.html',
  styleUrls: ['./recruiterDashboard.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    CommonModule,
  ]
})

export class recruiterDashboardComponent {

}
