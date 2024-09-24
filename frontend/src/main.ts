import { provideRouter } from '@angular/router';
import { appRoutes } from '../src/app/app-routing.module';

// <reference types="@angular/localize" />


import { bootstrapApplication } from '@angular/platform-browser';
import { MainComponent } from './app/main/main.component';

bootstrapApplication(MainComponent, {
  providers: [
    provideRouter(appRoutes)
  ]
})
  .catch(err => console.error(err));
