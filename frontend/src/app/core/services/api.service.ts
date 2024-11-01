import { Injectable } from '@angular/core';
import { environment } from '../../../environments/evironment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const URL = `${environment.api_url}`;
const defaultPort = `${environment.port}`;

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

  get(path: string, options?: { params?: HttpParams; headers?: HttpHeaders }, port: string = defaultPort): Observable<any> {
    console.log(`${URL}:${port}${path}`, options);
    return this.http.get(`${URL}:${port}${path}`, options).pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}, options?: { headers?: HttpHeaders }, port: string = defaultPort): Observable<any> {
    // console.log(`put api: `, `${URL}${path}`, body);
    return this.http.put(`${URL}:${port}${path}`, body, options).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}, options?: { headers?: HttpHeaders }, port: string = defaultPort): Observable<any> {
    // console.log(`${URL}${path}`, body);
    return this.http.post(`${URL}:${port}${path}`, body, options).pipe(catchError(this.formatErrors));
  }

  delete(path: string, options?: { headers?: HttpHeaders }, port: string = defaultPort): Observable<any> {
    return this.http.delete(`${URL}:${port}${path}`, options).pipe(catchError(this.formatErrors));
  }
}