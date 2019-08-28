import { Injectable } from '@angular/core';
import { ProjectsApi } from './api/projects.api';
import { Observable } from 'rxjs';
import { Project } from './models/project';
import { tap, take, finalize, map, filter } from 'rxjs/operators';
import { CoreState } from 'src/app/core/state/core.state';
import { HttpResponse } from '@angular/common/http';
import { ResponseError } from 'src/app/core/error-handler/response-error';
import { SearchProject } from './models/search-project';



@Injectable({
  providedIn: 'root'
})
export class ProjectsFacade {

  constructor(
    private projectsApi: ProjectsApi,
    private state: CoreState
  ) { }

  isUpdating$(): Observable<boolean> {
    return this.state.projects.isUpdating$();
  }

  isCompleted$(): Observable<string> {
    return this.state.projects.isCompleted$();
  }

  initCompleted() {
    this.setCompleted(this.state.projects.NOT_COMPLETED);
  }

  setCompleted(message: string) {
    this.state.projects.setCompleted(message);
  }

  getProjects$(): Observable<Project[]> {
    // here we just pass the state without any projections
    // it may happen that it is necessary to combine two or more streams and expose to the components
    return this.state.projects.getProjects$();
  }

  getError$(): Observable<any> {
    return this.state.projects.getError$();
  }

  getTotalProjects$() {
    return this.state.projects.getTotalProjects$();
  }

  loadProjects() {
    this.state.projects.setUpdating(true);
    this.projectsApi.getProjects(this.state.projects.getPage$().value, this.state.projects.getPageSize$().value, this.state.projects.getSortField$().value, this.state.projects.getSortDirection$().value, this.state.projects.getSearch$().value)
      .pipe(
        take(1),
        finalize(() => this.state.projects.setUpdating(false))
      ).subscribe(
        (response: HttpResponse<Project[]>) => this.setProjectsState(response.body, +response.headers.get(this.projectsApi.HEADER_TOTAL_ITEMS)),
        (error) => this.setProjectsErrorState(error),
      );
  }

  private setProjectsState(projects: Project[], totalProjects: number) {
    this.state.projects.setProjects(projects);
    this.state.projects.setTotalProjects(totalProjects);
    this.state.projects.setError(null);
  }

  private setProjectsErrorState(error) {
    this.state.projects.setProjects([]);
    this.state.projects.setTotalProjects(0);
    this.state.projects.setError(error);
    throw error;
  }

  getProject$(): Observable<Project> {
    return this.state.projects.getProject$();
  }

  getFormError$(): Observable<ResponseError> {
    return this.state.projects.getFormError$()
      .pipe(
        filter(data => data != null),
        map(error => new ResponseError(error))
      );
  }

  loadProject(id: number) {
    this.state.projects.setUpdating(true);
    this.projectsApi.getProject(id).pipe(
      tap((project: Project) => {
        this.state.projects.setProject(project);
        this.state.projects.setUpdating(false);
      })
    ).subscribe();
  }

  addProject() {
    this.state.projects.setProject(new Project());
  }

  saveNewProject(project: Project) {
    this.state.projects.setUpdating(true);
    this.state.projects.setCompleted(null);
    this.projectsApi.create(project).subscribe(
      () => {
        this.state.projects.setProject(project);
        this.state.projects.setCompleted('Project afegit correctament');
      },
      (error) => this.state.projects.setFormError(error.error),
      () => this.state.projects.setUpdating(false)
    );
  }

  saveUpdateProject(project: Project) {
    this.state.projects.setUpdating(true);

    this.projectsApi.update(project).subscribe(
      () => {
        this.state.projects.setProject(project);
        this.state.projects.setCompleted('Project modificat correctament');
      },
      (error) => console.error(error),
      () => this.state.projects.setUpdating(false)
    );
  }

  getSelectedId(): number {
    return this.state.projects.getSelectedId();
  }

  setSelectedId(id: number) {
    this.state.projects.setSelectedId(id);
  }

  deleteProject(id: number) {
    this.projectsApi.delete(id).subscribe(
      () => this.loadProjects(),
      (error) => console.error(error)
    );
  }

  setSortField(sortField: string) {
    this.state.projects.setSortField(sortField);
  }

  setSortDirection(direction: string) {
    this.state.projects.setSortDirection(direction);

  }

  setSearch(search: SearchProject) {
    this.state.projects.setSearch(search);
  }

  setPage(page: number) {
    this.state.projects.setPage(page);
  }

  setInitPage() {
    this.setPage(this.state.projects.INIT_PAGE);
  }

  setPageSize(pageSize: number) {
    this.state.projects.setPageSize(pageSize);
  }
}
