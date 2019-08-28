import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { SearchProject } from '../models/search-project';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ProjectsApi {

  readonly API = 'http://localhost:4321/ws/projects';
  readonly API_ERROR = 'http://localhost:4321/ws/error';
  readonly HEADER_TOTAL_ITEMS = 'X-Total-Count';

  constructor(private http: HttpClient) { }

  getProjects(page: number = 0, pageSize: number = 10, sortField: string = '', sortDirection: string = '', searchProject: SearchProject = null): Observable<HttpResponse<Project[]>> {
    let queryParams = new HttpParams()
      .set('_page', page.toString())
      .set('_rows', pageSize.toString());
    //.set('sort', sortField)
    //.set('direction', sortDirection);
    if (searchProject) {
      queryParams = this.appendSearchQueryParams(queryParams, searchProject);
    }
    const options = {
      observe: 'response' as 'body',
      params: queryParams
    };

    return this.http.get<HttpResponse<Project[]>>(this.API, options);
  }

  private appendSearchQueryParams(queryParams: HttpParams, searchProject: SearchProject) {
    for (var [key, value] of Object.entries(searchProject)) {
      if (value) {
        queryParams = queryParams.append(key, value);
      }
    }
    return queryParams;
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(this.API + '/' + id);
  }

  create(project: Project): Observable<Project> {
    return this.http.post<Project>(this.API_ERROR, project);
  }

  update(project: Project): Observable<Project> {
    return this.http.put<Project>(this.API, project);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.API + '/' + id);
  }
}
