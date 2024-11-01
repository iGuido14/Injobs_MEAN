import { Route } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./companyDashboard.component').then(c => c.companyDashboardComponent),
  }
] as Route[]
