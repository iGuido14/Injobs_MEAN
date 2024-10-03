import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { appRoutes } from './app.routes';
import { HttpTokenInterceptor } from './core/interceptors/http.token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor }

  ]
};
