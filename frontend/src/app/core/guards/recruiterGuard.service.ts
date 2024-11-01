import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '..';

@Injectable({
    providedIn: 'root'
})
export class CompanyGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        const user = this.userService.getCurrentUser(); // Implement this method in AuthService

        if (user && user.userType === 'recruiter') {
            return true;
        }

        this.router.navigateByUrl('/');
        return false;
    }
}
