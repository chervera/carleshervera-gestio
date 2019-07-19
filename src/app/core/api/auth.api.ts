import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthApi {

  readonly API = 'http://localhost:4321/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(this.API, { name: username, password: password });
  }
}
