import { Injectable } from '@angular/core';
import { environment } from '../../../environments/evironment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const URL = `${environment.api_url}`

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) { }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, options?: { params?: HttpParams; headers?: HttpHeaders }): Observable<any> {
    // console.log(`Calling GET on path: ${path}`);
    return this.http.get(`${URL}${path}`, options).pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${URL}${path}`, JSON.stringify(body)).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${URL}${path}`, body).pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${URL}${path}`).pipe(catchError(this.formatErrors));
  }
}