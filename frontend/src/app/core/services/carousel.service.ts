import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { CarouselDetails, CarouselHome } from '../models/carousel.model';
import { environment } from '../../../environments/evironment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})

export class CarouselService {

  constructor(private apiService: ApiService) { }

  getCarouselHome(): Observable<CarouselHome[]> {
    return this.apiService.get(`/carousel/`);
  }

  getCarouselDetails(slug: String | null): Observable<CarouselDetails[]> {
    return this.apiService.get(`/carousel/${slug}`);
  }
}