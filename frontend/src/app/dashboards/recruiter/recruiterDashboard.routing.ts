import { Route } from '@angular/router';
import { RecruiterGuard } from 'src/app/core/guards/recruiterGuard.service';

export default [
  {
    path: '',
    loadComponent: () => import('../../shared/_recruiter/application-list/applicationList.component').then(c => c.applicationListComponent),
    canActivate: [RecruiterGuard]
  },
  {
    path: 'closed',
    loadComponent: () => import('../../shared/_recruiter/accepted-applications/acceptedApplication.component').then(c => c.acceptedApplicationComponent),
    canActivate: [RecruiterGuard]
  }
] as Route[]
