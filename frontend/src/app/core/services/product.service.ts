import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

const URL = 'http://localhost:3001/products';
const URLcat = 'http://localhost:3001/categories';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor(private http: HttpClient) { }

    //GET ALL
    get_products(): Observable<Product[]> {
        return this.http.get<Product[]>(URL);
    }

    //GET ONE
    get_product(slug: String): Observable<Product> {
        return this.http.get<Product>(`${URL}/${slug}`);
    }

    getProductsByCategory(slug: String): Observable<Product[]> {
        return this.http.get<Product[]>(`${URLcat}/${slug}`);
    }
}