import { Injectable } from '@angular/core';
import { State } from 'src/app/core/state/state';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthState extends State {

  private readonly token$ = new BehaviorSubject<string>(null);

  constructor() {
    super();
  }

  getToken$() {
    return this.token$.asObservable();
  }

  getToken() {
    return this.token$.value;
  }
  setToken$(token: string) {
    this.token$.next(token);
  }


}
