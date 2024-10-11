import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Comment } from '../models/comment.model';
import { map } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) { }

  add(slug: any, payload: any): Observable<Comment> {
    console.log(slug);
    const accessToken = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Token ${accessToken}` // Format: Token <token>
    });

    // return slug;
    return this.apiService.post(`/${slug}/comments`, { comment: payload }, { headers })
      .pipe(map((data) => {
        console.log(data);
        return data
      }));
  }

  getAll(slug: any): Observable<Comment[]> {
    return this.apiService.get(`/${slug}/comments`)
      .pipe(map(data => data.comments));
  }

  destroy(commentId: any, productSlug: any) {
    return this.apiService.delete(
      `/${productSlug}/comments/${commentId}`
    );
  }

}