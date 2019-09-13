import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, shareReplay, take } from 'rxjs/operators';
import { MasterApi } from './api/master.api';
import { CoreState } from 'src/app/core/state/core.state';
import { Master } from './models/master';

@Injectable({
  providedIn: 'root'
})
export class MasterFacade {

  constructor(
    private masterApi: MasterApi,
    private state: CoreState
  ) { }

  loadDepartments() {
    this.state.master.setUpdating(true);
    this.masterApi.getDepartments()
      .pipe(
        take(1),
        finalize(() => this.state.master.setUpdating(false))
      ).subscribe(
        (items: Master[]) => this.setDepartments(items),
      );
  }

  private setDepartments(departments: Master[]) {
    this.state.master.setDepartments(departments);
    this.state.master.setError(null);
  }

  getDepartments$(): Observable<Master[]> {
    return this.state.master.getDepartments$();
  }


}
