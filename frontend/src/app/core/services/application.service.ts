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

    generate_application(slug: String, username: String): Observable<any> {
        return this.apiService.post(`/application/${slug}/${username}`, undefined, undefined);
    }

    accept_application(slug: String): Observable<any> {
        return this.apiService.put(`/application/${slug}/accept`, undefined, undefined, "3003");
    }

    discard_application(slug: String): Observable<any> {
        return this.apiService.put(`/application/${slug}/discard`, undefined, undefined, "3003");
    }
}