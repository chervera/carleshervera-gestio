import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Master } from '../models/master';
import { Observable } from 'rxjs';
import { Api } from 'src/app/core/auth/api/api';

@Injectable({
  providedIn: 'root'
})
export class MasterApi extends Api {

  readonly API_DEPARTMENT: string = "departaments";

  constructor(private http: HttpClient) {
    super();
  }

  getDepartments(): Observable<Master[]> {
    return this.http.get<Master[]>(this.URL_API + this.API_DEPARTMENT);
  }
}
