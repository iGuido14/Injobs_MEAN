import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; // Importa HttpClient para utilizarlo en service
import { CoreModule } from './core/core.module'; // Importa el módulo Core

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    CoreModule,
    provideHttpClient()  // Agrega HttpClient como proveedor
  ]
};
