import { Route } from '@angular/router';
import { CompanyGuard } from 'src/app/core/guards/companyGuard.service';

export default [
  {
    path: '',
    loadComponent: () => import('../../shared/_company/job-list/JobList.component').then(c => c.jobListComponent),
    canActivate: [CompanyGuard]
  },
  {
    path: 'createJob',
    loadComponent: () => import('../../shared/_company/create-job/createJob.component').then(c => c.createJobComponent),
    canActivate: [CompanyGuard]
  }
] as Route[]
