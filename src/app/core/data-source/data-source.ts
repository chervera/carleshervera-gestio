import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';

export class CoreDataSource<T> extends DataSource<T> {

  constructor(
    private items$: Observable<T[]>,
    private totalItems$: Observable<number>,
    private isUpdating$: Observable<boolean>,
  ) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.items$;
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

  getIsUpdating$() {
    return this.isUpdating$;
  }

  getTotalItems$() {
    return this.totalItems$;
  }

  getItems$() {
    return this.items$;
  }

}