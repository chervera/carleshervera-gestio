import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';

export class CoreDataSource<T> extends DataSource<T> {

  constructor(
    private items$: Observable<T[]>,
  ) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.items$;
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

  getItems$() {
    return this.items$;
  }

}