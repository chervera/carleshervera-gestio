import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticlesApi {

  readonly API = 'http://localhost:4321/ws/article';

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.API);
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(this.API + '/' + id);
  }

  create(article: Article): Observable<Article> {
    return this.http.post<Article>(this.API, article);
  }
}
