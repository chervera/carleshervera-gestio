import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Article } from '../../models/article';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ArticlesFacade } from '../../articles.facade';
import { catchError, finalize, tap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

export class ArticlesDataSource extends DataSource<Article> {

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private items$: Observable<Article[]>,
  ) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.items$;
  }

  disconnect(collectionViewer: CollectionViewer): void {

  }

}