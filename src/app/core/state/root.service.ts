import { Injectable } from '@angular/core';
import { RootStore } from './root.store';
import { RootApi } from './root.api';

@Injectable({ providedIn: 'root' })
export class RootService {
  constructor(protected store: RootStore, protected rootApi: RootApi) {}

  updateAuth(token: string, user: any) {
    this.store.update({
      auth: {
        token: token,
        user: user
      }
    });
  }

  reset() {
    this.store.reset();
  }

  loadDepartaments() {
    this.rootApi
      .getDepartments()
      .subscribe(departaments =>
        this.store.update({ departaments: departaments })
      );
  }
}
