import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesState {

  private updating$ = new BehaviorSubject<boolean>(false);
  private articles$ = new BehaviorSubject<Article[]>(null);

  constructor() { }

  isUpdating$() {
    return this.updating$.asObservable();
  }

  setUpdating(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }

  getArticles$() {
    return this.articles$.asObservable();
  }

  setArticles(articles: Article[]) {
    this.articles$.next(articles);
  }


}
