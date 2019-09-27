import { Injectable } from '@angular/core';
import { AuthApi } from '../api/auth.api';
import { tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { RootQuery } from '@app/core/state/root.query';
import { RootService } from '@app/core/state/root.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private authApi: AuthApi,
    private rootQuery: RootQuery,
    private rootService: RootService
  ) {}

  login(username: string, password: string) {
    return this.authApi
      .login(username, password)
      .pipe(
        tap(data =>
          this.rootService.updateAuth(data['token'], jwt_decode(data['token']))
        )
      );
  }

  logout(): void {
    this.rootService.reset();
  }

  isLoggedIn() {
    return this.rootQuery.selectToken();
  }

  getToken() {
    return this.rootQuery.getValue().auth.token;
  }
}
