import { Route } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { NoAuthGuard } from "src/app/core/services";

export default [
    {
        path: '',
        loadComponent: () => import('./auth.component').then(c => c.AuthComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./auth.component').then(c => c.AuthComponent),
        // canActivate: [NoAuthGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./auth.component').then(c => c.AuthComponent),
        // canActivate: [NoAuthGuard]
    }
] as Route[]