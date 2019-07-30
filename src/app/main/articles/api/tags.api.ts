import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagsApi {

  readonly API = 'http://localhost:4321/ws/tag';
  readonly HEADER_TOTAL_ITEMS = 'X-Total-Count';

  constructor(private http: HttpClient) { }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.API);
  }
}
