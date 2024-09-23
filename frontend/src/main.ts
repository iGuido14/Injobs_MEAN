import { provideRouter } from '@angular/router';
import { routes } from '../src/app/app-routing.module';

/// <reference types="@angular/localize" />

// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app/app.module';

import { bootstrapApplication } from '@angular/platform-browser';
import { MainComponent } from './app/main/main.component';

bootstrapApplication(MainComponent, {
  providers: [
    provideRouter(routes)
  ]
})
  // platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
