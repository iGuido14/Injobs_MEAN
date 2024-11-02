import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Product, Filters } from '../models';
import { environment } from '../../../environments/evironment';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})

export class ApplicationService {

    constructor(
        private apiService: ApiService,
    ) { }

    get_applications(username: string): Observable<any> {
        return this.apiService.get(`/applications/${username}`, undefined, "3003");
    }
}