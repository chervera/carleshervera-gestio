import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../models/article';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class ArticlesState {

  readonly NOT_COMPLETED = null;
  readonly INIT_PAGE = new PageEvent();


  private updating$ = new BehaviorSubject<boolean>(false);
  private completed$ = new BehaviorSubject<string>(this.NOT_COMPLETED);
  private articles$ = new BehaviorSubject<Article[]>(null);
  private article$ = new BehaviorSubject<Article>(null);
  private sort$ = new BehaviorSubject<Sort>(null);
  private page$ = new BehaviorSubject<PageEvent>(this.INIT_PAGE);

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


  getSort$() {
    return this.sort$;
  }

  setSort(sort: Sort) {
    this.sort$.next(sort);
  }

  getPage$() {
    return this.page$;
  }

  setPage(page: PageEvent) {
    this.page$.next(page);
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
