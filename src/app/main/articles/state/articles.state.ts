import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../models/article';
import { State } from 'src/app/core/state/state';

@Injectable({
  providedIn: 'root'
})
export class ArticlesState extends State {

  readonly NOT_COMPLETED = null;
  readonly INIT_PAGE = 0;
  readonly DEFAULT_PAGE_SIZE = 0;

  private updating$ = new BehaviorSubject<boolean>(false);
  private completed$ = new BehaviorSubject<string>(this.NOT_COMPLETED);
  private articles$ = new BehaviorSubject<Article[]>(null);
  private totalArticles$ = new BehaviorSubject<number>(0);
  private article$ = new BehaviorSubject<Article>(null);
  private sortField$ = new BehaviorSubject<string>(null);
  private sortDirection$ = new BehaviorSubject<string>(null);
  private page$ = new BehaviorSubject<number>(this.INIT_PAGE);
  private pageSize$ = new BehaviorSubject<number>(this.DEFAULT_PAGE_SIZE);

  private selectedId: number;

  constructor() {
    super();
  }

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


  getSortField$() {
    return this.sortField$;
  }

  setSortField(field: string) {
    this.sortField$.next(field);
  }

  getSortDirection$() {
    return this.sortDirection$;
  }

  setSortDirection(direction: string) {
    this.sortDirection$.next(direction);
  }

  getTotalArticles$() {
    return this.totalArticles$;
  }

  setTotalArticles(total: number) {
    this.totalArticles$.next(total);
  }

  getPage$() {
    return this.page$;
  }

  setPage(page: number) {
    this.page$.next(page);
  }

  getPageSize$() {
    return this.pageSize$;
  }

  setPageSize(pageSize: number) {
    this.pageSize$.next(pageSize);
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
