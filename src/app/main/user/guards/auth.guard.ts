import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserFacade } from '../user.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userFacade: UserFacade,
    private router: Router
  ) { }

  canActivate() {
    return !!this.userFacade.isLoggedIn();
  }
}