import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class ArticlesApi {

  readonly API = 'http://localhost:4321/ws/article';
  readonly HEADER_TOTAL_ITEMS = 'X-Total-Count';

  constructor(private http: HttpClient) { }

  getArticles(page?: PageEvent, sort?: Sort): Observable<HttpResponse<Article[]>> {
    const queryParams = sort ? new HttpParams().set('sort', sort.active).set('direction', sort.direction) : null;
    const options = {
      observe: 'response' as 'body',
      params: queryParams
    };
    console.log(page);
    return this.http.get<HttpResponse<Article[]>>(this.API, options);
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(this.API + '/' + id);
  }

  create(article: Article): Observable<Article> {
    return this.http.post<Article>(this.API, article);
  }

  update(article: Article): Observable<Article> {
    return this.http.put<Article>(this.API, article);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.API + '/' + id);
  }
}
