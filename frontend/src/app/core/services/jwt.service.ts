import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  getToken(): String {
    return window.localStorage['access_token'];
  }

  saveToken(access_token: String, refresh_token?: String) {
    window.localStorage['access_token'] = access_token;
  }

  destroyToken() {
    window.localStorage.removeItem('access_token');
  }

}