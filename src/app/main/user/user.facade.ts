import { Injectable } from '@angular/core';
import { UserApi } from './api/user.api';
import { CoreState } from 'src/app/core/state/core.state';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserFacade {

  constructor(
    private userApi: UserApi,
    private state: CoreState
  ) { }

  login(username: string, password: string) {
    return this.userApi.login(username, password).pipe(
      tap((data) => this.state.user.setToken$(data['token']))
    );
  }

  isLoggedIn() {
    return this.state.user.getToken();
  }

  printState() {
    this.state.printGlobalState();
  }
}
