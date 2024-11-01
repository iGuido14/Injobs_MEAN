import { Route } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('../../shared/_company/job-list/JobList.component').then(c => c.jobListComponent),
  },
  {
    path: 'createJob',
    loadComponent: () => import('../../shared/_company/create-job/createJob.component').then(c => c.createJobComponent),
  }
] as Route[]
