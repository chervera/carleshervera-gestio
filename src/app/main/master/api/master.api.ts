import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Master } from '../models/master';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterApi {

  readonly API = 'http://localhost:4321/ws';
  readonly API_DEPARTMENT: string = "departaments";

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Master[]> {
    return this.http.get<Master[]>(this.API + '/' + this.API_DEPARTMENT);
  }
}
