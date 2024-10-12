import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Profile } from '../models';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) { }

  get(username: string): Observable<Profile> {
    return this.apiService.get(`/profile/${username}`)
      .pipe(map((data: { profile: Profile }) => data.profile));
  }

  follow(username: string): Observable<Profile> {
    const accessToken = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Token ${accessToken}` // Format: Token <token>
    });
    return this.apiService.post(`/profile/${username}/follow`, {}, { headers });
  }

  unfollow(username: string): Observable<Profile> {
    const accessToken = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Token ${accessToken}` // Format: Token <token>
    });
    return this.apiService.delete(`/profile/${username}/follow`, { headers });
  }

}
