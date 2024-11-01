import { Route } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./recruiterDashboard.component').then(c => c.recruiterDashboardComponent),
  }
] as Route[]
