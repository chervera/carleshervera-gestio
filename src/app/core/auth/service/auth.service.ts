import { Injectable } from '@angular/core';
import { AuthApi } from '../api/auth.api';
import { CoreState } from 'src/app/core/state/core.state';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authApi: AuthApi,
    private state: CoreState
  ) { }

  login(username: string, password: string) {
    return this.authApi.login(username, password).pipe(
      tap((data) => this.state.auth.setToken$(data['token']))
    );
  }

  logout() {
    this.state.auth.setToken$(null);
  }

  isLoggedIn() {
    return this.getToken();
  }

  getToken() {
    return this.state.auth.getToken();
  }

  refreshToken() {
    return this.authApi.login(null, null).pipe(
      tap((data) => this.state.auth.setToken$(data['token']))
    );
  }

  printState() {
    this.state.printGlobalState();
  }
}
