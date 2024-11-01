import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject, lastValueFrom } from 'rxjs';

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

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) { }

  populate() {
    const token = this.jwtService.getToken();

    if (!token) {
      this.purgeAuth();
    } else {
      const userInfo = this.getCurrentUser();

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      });

      if (userInfo.userType === "company") {
        console.log(`es company`);
        this.apiService.get(`/user/${userInfo.username}`, { headers }, "3002").subscribe(
          (data) => this.setAuth({ ...data.user, token }),
          (err) => this.purgeAuth()
        );
      } else if (userInfo.userType === "recruiter") {
        console.log(`es recruiter`);
        this.apiService.get(`/user/${userInfo.email}`, { headers }, "3003").subscribe(
          (data) => this.setAuth({ ...data.user, token }),
          (err) => this.purgeAuth()
        );
      } else {
        console.log(`es user`);
        this.apiService.get("/user", { headers }).subscribe(
          (data) => this.setAuth({ ...data.user, token }),
          (err) => this.purgeAuth()
        );
      }
    }
  }


  setAuth(user: User) {
    // console.log(user);
    // this.jwtService.saveToken(user.accessToken, user.refreshToken);
    // console.log(`intenta guardar token`);
    this.jwtService.saveToken(user.accessToken);
    this.currentUserSubject.next(user);
    this.currentUser.subscribe(userData => { }).unsubscribe();
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type: any, credentials: any): Observable<User> {
    const route = (type === 'login') ? '/login' : '';

    return this.apiService.post(`/users${route}`, { user: credentials })
      .pipe(map(
        data => {
          // console.log(data);
          // console.log(data.user);
          this.setAuth(data.user);
          return data.user;
        }
      ));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  update(user: User): Observable<User> {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });

    return this.apiService.put('/user', { user }, { headers }).pipe(map(data => {
      this.currentUserSubject.next(data.user);
      return data.user;
    }));
  }

}
