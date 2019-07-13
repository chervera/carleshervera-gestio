import { Injectable } from '@angular/core';
import { ArticlesApi } from './api/articles.api';
import { ArticlesState } from './state/articles.state';
import { Observable } from 'rxjs';
import { Article } from './models/article';
import { tap, map } from 'rxjs/operators';
import { CoreState } from 'src/app/core/state/core.state';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ArticlesFacade {

  constructor(
    private articlesApi: ArticlesApi,
    private state: CoreState
  ) { }

  isUpdating$(): Observable<boolean> {
    return this.state.articles.isUpdating$();
  }

  isCompleted$(): Observable<string> {
    return this.state.articles.isCompleted$();
  }

  initCompleted() {
    this.setCompleted(this.state.articles.NOT_COMPLETED);
  }

  setCompleted(message: string) {
    this.state.articles.setCompleted(message);
  }

  getArticles$(): Observable<Article[]> {
    // here we just pass the state without any projections
    // it may happen that it is necessary to combine two or more streams and expose to the components
    return this.state.articles.getArticles$();
  }

  getTotalArticles$(){
    return this.state.articles.getTotalArticles$();
  }

  loadArticles() {
    this.state.articles.setUpdating(true);
    this.articlesApi.getArticles(this.state.articles.getPage$().value, this.state.articles.getSort$().value )
      .pipe(
        map((response: HttpResponse<Article[]>) => {
          this.state.articles.setArticles(response.body);
          this.state.articles.setTotalArticles(+response.headers.get(this.articlesApi.HEADER_TOTAL_ITEMS));
          this.state.articles.setUpdating(false);
        })
      ).subscribe();
  }

  getArticle$(): Observable<Article> {
    return this.state.articles.getArticle$();
  }

  loadArticle(id: number) {
    this.state.articles.setUpdating(true);
    this.articlesApi.getArticle(id).pipe(
      tap((article: Article) => {
        this.state.articles.setArticle(article);
        this.state.articles.setUpdating(false);
      })
    ).subscribe();
  }

  addArticle() {
    this.state.articles.setArticle(new Article(new Date()));
  }

  saveNewArticle(article: Article) {
    this.state.articles.setUpdating(true);
    this.state.articles.setCompleted(null);
    this.articlesApi.create(article).subscribe(
      () => {
        this.state.articles.setArticle(article);
        this.state.articles.setCompleted('Article afegit correctament');
      },
      (error) => console.error(error),
      () => this.state.articles.setUpdating(false)
    );
  }

  saveUpdateArticle(article: Article) {
    this.state.articles.setUpdating(true);

    this.articlesApi.update(article).subscribe(
      () => {
        this.state.articles.setArticle(article);
        this.state.articles.setCompleted('Article modificat correctament');
      },
      (error) => console.error(error),
      () => this.state.articles.setUpdating(false)
    );
  }

  getSelectedId(): number {
    return this.state.articles.getSelectedId();
  }

  setSelectedId(id: number) {
    this.state.articles.setSelectedId(id);
  }

  deleteArticle(id: number) {
    this.articlesApi.delete(id).subscribe(
      () => this.loadArticles(),
      (error) => console.error(error)
    );
  }

  setSort(sort: Sort) {
    this.state.articles.setSort(sort);
    this.loadArticles();
  }

  setPage(page: PageEvent) {
    this.state.articles.setPage(page);
    this.loadArticles();
  }
}
