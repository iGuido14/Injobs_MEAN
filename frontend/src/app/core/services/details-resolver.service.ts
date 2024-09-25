import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Product } from '../models/product.model';
import { ProductService } from './product.service';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DetailsResolver implements Resolve<Product> {
    constructor(
        private productService: ProductService,
        private router: Router
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.productService.get_product(route.params['slug'])
            .pipe(catchError((err) => this.router.navigateByUrl('/')));
    }
}