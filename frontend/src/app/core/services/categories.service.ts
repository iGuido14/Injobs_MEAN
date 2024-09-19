import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

const URL = 'http://127.0.0.1:3001/categories';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(private http: HttpClient) { }

  all_categories(params: any): Observable<Category[]> {
    return this.http.get<Category[]>(URL, { params });
  }
}

export { Category };