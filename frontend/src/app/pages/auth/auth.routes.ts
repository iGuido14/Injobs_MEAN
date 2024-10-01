import { Route } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { NoAuthGuard } from "src/app/core/services";

export default [
    {
        path: 'login',
        // component: AuthComponent,
        loadComponent: () => import('./auth.component').then(c => c.AuthComponent),
        canActivate: [NoAuthGuard]
    },
    {
        path: 'register',
        // component: AuthComponent,
        loadComponent: () => import('./auth.component').then(c => c.AuthComponent),
        canActivate: [NoAuthGuard]
    }
] as Route[]