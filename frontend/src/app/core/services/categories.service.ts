import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from '../../../environments/evironment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private apiService: ApiService) { }

  all_categories(params: any): Observable<Category[]> {
    return this.apiService.get(`/categories/`);
  }

  all_categories_select(): Observable<Category[]> {
    return this.apiService.get(`/categories/`);
  }
}

export { Category };