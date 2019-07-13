import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class ArticlesApi {

  readonly API = 'http://localhost:4321/ws/article';

  constructor(private http: HttpClient) { }

  getArticles(sort?: Sort): Observable<Article[]> {
    const options = sort ?
      { params: new HttpParams().set('sort', sort.active).set('direction', sort.direction) } : {};
    return this.http.get<Article[]>(this.API, options);
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
