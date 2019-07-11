import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Article } from '../../models/article';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ArticlesFacade } from '../../articles.facade';
import { catchError, finalize, tap } from 'rxjs/operators';

export class ArticlesDataSource implements DataSource<Article> {

  private articlesSubject = new BehaviorSubject<Article[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();


  constructor(private articlesFacade: ArticlesFacade) { }

  connect(collectionViewer: CollectionViewer): Observable<Article[]> {
    return this.articlesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.articlesSubject.complete();
    this.loadingSubject.complete();
  }

  loadArticles(filter?: string,
    sortDirection?: string, pageIndex?: number, pageSize?: number) {

    this.loadingSubject.next(true);

    this.articlesFacade.getArticles$().pipe(
      catchError(() => of([])),
      tap(() => this.loadingSubject.next(false))
    ).subscribe(articles => this.articlesSubject.next(articles));
  }
}