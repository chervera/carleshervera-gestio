import { Injectable } from '@angular/core';
import { AuthApi } from '../api/auth.api';
import { CoreState } from 'src/app/core/state/core.state';
import { tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authApi: AuthApi,
    private state: CoreState,
  ) { }

  login(username: string, password: string) {
    return this.authApi.login(username, password).pipe(
      tap((data) => this.state.auth.setToken$(data['token'])),
      tap((data) => this.state.auth.setUser$(jwt_decode(data['token'])))
    );
  }

  logout(): void {
    this.state.auth.setToken$(null);
    this.state.auth.setUser$(null);
  }

  isLoggedIn$() {
    return this.getToken$();
  }

  getToken$() {
    return this.state.auth.getToken$();
  }

  getToken() {
    return this.state.auth.getToken();
  }

  getUser$() {
    return this.state.auth.getUser$();
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
