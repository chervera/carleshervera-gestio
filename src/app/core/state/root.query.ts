import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { RootStore, RootState } from './root.store';

@Injectable({ providedIn: 'root' })
export class RootQuery extends Query<RootState> {
  constructor(protected store: RootStore) {
    super(store);
  }

  selectDepartaments() {
    return this.select(state => state.departaments);
  }

  selectUser() {
    return this.select(state => state.auth.user);
  }

  selectToken() {
    return this.select(state => state.auth.token);
  }
}
