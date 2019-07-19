import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthFacade } from '../auth.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authFacade: AuthFacade,
    private router: Router
  ) { }

  canActivate() {
    if (!this.authFacade.isLoggedIn()) {
      this.router.navigate(['user/login']);
      return false;
    }
    return !!this.authFacade.isLoggedIn();
  }
}
