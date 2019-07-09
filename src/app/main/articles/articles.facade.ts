import { Injectable } from '@angular/core';
import { ArticlesApi } from './api/articles.api';
import { ArticlesState } from './state/articles.state';
import { Observable } from 'rxjs';
import { Article } from './models/article';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ArticlesFacade {

  constructor(private articlesApi: ArticlesApi, private articlesState: ArticlesState) { }

  isUpdating$(): Observable<boolean> {
    return this.articlesState.isUpdating$();
  }

  getArticles$(): Observable<Article[]> {
    // here we just pass the state without any projections
    // it may happen that it is necessary to combine two or more streams and expose to the components
    return this.articlesState.getArticles$();
  }

  loadArticles() {
    this.articlesState.setUpdating(true);
    this.articlesApi.getArticles()
      .pipe(
        tap(articles => console.log(articles)),
        tap(articles => {
          this.articlesState.setArticles(articles);
          this.articlesState.setUpdating(false);
        })
      ).subscribe();
  }
}
