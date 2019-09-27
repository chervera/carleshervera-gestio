import { Injectable } from '@angular/core';
import { ProjectsAction } from './state/projects.action';
import { ProjectsQuery } from './state/projects.query';
import { ProjectsApi } from './api/projects.api';
import { take, tap, catchError, finalize } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Project } from './state/project.model';
import { SearchProject } from './models/search-project';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(
    private action: ProjectsAction,
    private query: ProjectsQuery,
    private api: ProjectsApi
  ) {}

  loadProjects() {
    this.api
      .getProjects(
        this.query.getValue().page,
        this.query.getValue().pageSize,
        this.query.getValue().sortField,
        this.query.getValue().sortDirection,
        this.query.getValue().search
      )
      .pipe(take(1))
      .subscribe((response: HttpResponse<Project[]>) => {
        this.action.updateProjects(
          response.body,
          +response.headers.get(this.api.HEADER_TOTAL_ITEMS)
        );
      });
  }

  loadProject(id: number) {
    this.api
      .getProject(id)
      .subscribe(project => this.action.updateProject(project));
  }

  paginate(pageIndex: number, pageSize: number) {
    this.action.updatePagination(pageIndex, pageSize);
    this.loadProjects();
  }

  sort(active: string, direction: string) {
    this.action.updateSort(active, direction);
    this.loadProjects();
  }

  search(search: SearchProject) {
    this.action.updateSort(null, null);
    this.action.updateFilters(search);
    this.loadProjects();
  }

  saveUpdateProject(project: Project) {
    this.action.setLoading(true);

    return this.api.update(project).pipe(
      take(1),
      tap(() => {
        this.action.updateProject(project);
      }),
      catchError(error => {
        this.action.updateApiErrors(error.error);
        return of(error);
      }),
      finalize(() => this.action.setLoading(false))
    );
  }

  saveNewProject(project: Project) {
    this.action.setLoading(true);

    return this.api.create(project).pipe(
      take(1),
      tap(() => {
        this.action.updateProject(project);
      }),
      catchError(error => {
        this.action.updateApiErrors(error.error);
        return of(error);
      }),
      finalize(() => this.action.setLoading(false))
    );
  }

  deleteProject(id: number) {
    return this.api.delete(id);
  }
}
