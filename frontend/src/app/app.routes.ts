import { RouterModule, Routes } from '@angular/router';
import { DetailsResolver } from './core/services';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'shop',
    loadChildren: () => import('./pages/shop/shop.routes')
  },
  {
    path: 'details/:slug',
    loadComponent: () => import('./pages/details/details.component').then(c => c.DetailsComponent),
    resolve: { product: DetailsResolver }
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes')
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.routing')
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.routing')
  },
  {
    path: 'companyDashboard',
    loadComponent: () => import('./dashboards/company/companyDashboard.component').then(c => c.companyDashboardComponent)
  },
  {
    path: 'recruiterDashboard',
    loadComponent: () => import('./dashboards/recruiter/recruiterDashboard.component').then(c => c.recruiterDashboardComponent)
  }

]