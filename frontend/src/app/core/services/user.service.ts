import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { __values } from 'tslib';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
  // public currentUser = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) { }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // const token = `Token ${this.jwtService.getToken()}`;
    const token = this.jwtService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      });
      this.apiService.get("/user", { headers }).subscribe(
        (data) => {
          // console.log(`Populate user:`, data.user);
          return this.setAuth({ ...data.user, token });
        },
        (err) => this.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    // console.log(`entra en setAuth`);
    // console.log(user.token);
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    // console.log('CurrentUserSubject:', this.currentUserSubject.value);
    this.currentUser.subscribe(userData => {
      // console.log(`Current user setAuth`, userData);
    }).unsubscribe();
    this.isAuthenticatedSubject.next(true);
    // console.log(this.currentUser);
    // console.log(this.isAuthenticated);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type: any, credentials: any): Observable<User> {
    const route = (type === 'login') ? '/login' : '';
    // const token = this.jwtService.getToken();
    // console.log(token);
    // console.log(route);
    // console.log(credentials);
    return this.apiService.post(`/users${route}`, { user: credentials })
      .pipe(map(
        data => {
          this.setAuth(data.user);
          // console.log(data.user);
          return data.user;
        }
      ));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user: User): Observable<User> {
    console.log('user service: ', user);
    const token = this.jwtService.getToken(); // Get the token from your JwtService
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}` // Ensure you use the correct format
    });
    return this.apiService.put('/user', { user }, { headers }).pipe(map(data => {
      this.currentUserSubject.next(data.user);
      return data.user;
    }));
  }

}
