import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesState {

  readonly NOT_COMPLETED = null;

  private updating$ = new BehaviorSubject<boolean>(false);
  private completed$ = new BehaviorSubject<string>(this.NOT_COMPLETED);
  private articles$ = new BehaviorSubject<Article[]>(null);
  private article$ = new BehaviorSubject<Article>(null);

  private selectedId: number;

  constructor() { }

  isUpdating$() {
    return this.updating$.asObservable();
  }

  setUpdating(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }

  isCompleted$() {
    return this.completed$.asObservable();
  }

  setCompleted(message: string) {
    this.completed$.next(message);
  }

  setErrorCompleted(error: Error) {
    this.completed$.error(error);
  }


  getArticles$() {
    return this.articles$.asObservable();
  }

  setArticles(articles: Article[]) {
    this.articles$.next(articles);
  }

  getArticle$() {
    return this.article$.asObservable();
  }

  setArticle(article: Article) {
    this.article$.next(article);
  }

  setSelectedId(id: number) {
    this.selectedId = id;
  }

  getSelectedId(): number {
    return this.selectedId;
  }

}
