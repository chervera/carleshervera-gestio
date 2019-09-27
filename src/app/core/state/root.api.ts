import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Master } from '../master/models/master';
import { Observable } from 'rxjs';
import { Api } from 'src/app/core/auth/api/api';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class RootApi extends Api {
  readonly API_DEPARTMENT: string = 'departaments';

  constructor(private http: HttpClient) {
    super();
  }

  @Cacheable()
  getDepartments(): Observable<Master[]> {
    return this.http.get<Master[]>(this.URL_API + this.API_DEPARTMENT);
  }
}
