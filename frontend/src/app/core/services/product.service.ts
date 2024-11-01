import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Product, Filters } from '../models';
import { environment } from '../../../environments/evironment';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor(
        private apiService: ApiService,
        private jwtService: JwtService
    ) { }

    // GET ALL
    get_products(params: any): Observable<Product[]> {
        return this.apiService.get(`/products/`);
    }

    // GET ONE
    get_product(slug: String): Observable<Product> {
        return this.apiService.get(`/products/${slug}`);
    }

    // GET JOBS BY CATEGORY
    getProductsByCategory(slug: String): Observable<Product[]> {
        return this.apiService.get(`/categories/${slug}`);
    }

    //SEARCH
    find_product_name(search: string): Observable<any> {
        return this.apiService.get(`/products?name=${search}`).pipe(
            map((data) => {
                return data;
            })
        );
    }

    //FILTERS
    get_products_filter(filters: Filters): Observable<Product[]> {
        let params = new HttpParams();

        Object.keys(filters).forEach(key => {
            const value = (filters as any)[key]; // Use 'as any' to bypass indexing issue
            if (value !== null && value !== undefined) {
                params = params.set(key, value);
            }
        });
        // params = filters;
        return this.apiService.get(`/products/`, { params });
        // return this.apiService.get(`/products/`, params);
    }

    favorite(slug: String): Observable<any> {
        const accessToken = this.jwtService.getToken();
        const headers = new HttpHeaders({
            'Authorization': `Token ${accessToken}` // Format: Token <token>
        });
        return this.apiService.post(`/${slug}/favorite`, {}, { headers })
    }

    unfavorite(slug: String): Observable<any> {
        const accessToken = this.jwtService.getToken();
        const headers = new HttpHeaders({
            'Authorization': `Token ${accessToken}` // Format: Token <token>
        });
        return this.apiService.delete(`/${slug}/favorite`, { headers })
    }

    // company products
    get_products_company(username: String): Observable<Product[]> {
        // console.log(`username: `, username);
        return this.apiService.get(`/product/company/${username}`, undefined, "3002");
    }

    create_product_company(username: String, body: any): Observable<any> {
        console.log(`entra a create_product_company`);
        return this.apiService.post(`/productCreate/company_1`, { product: body }, undefined, "3002");
    }
}