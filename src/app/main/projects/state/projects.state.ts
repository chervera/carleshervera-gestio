import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../models/project';
import { State } from 'src/app/core/state/state';
import { ResponseError } from 'src/app/core/error-handler/response-error';
import { SearchProject } from '../models/search-project';

export class ProjectsState extends State {

  readonly NOT_COMPLETED = null;
  readonly INIT_PAGE = 0;
  readonly DEFAULT_PAGE_SIZE = 0;

  private readonly projects$ = new BehaviorSubject<Project[]>(null);
  private readonly project$ = new BehaviorSubject<Project>(null);

  private readonly updating$ = new BehaviorSubject<boolean>(false);
  private readonly completed$ = new BehaviorSubject<string>(this.NOT_COMPLETED);
  private readonly error$ = new BehaviorSubject<Error>(null);
  private readonly totalProjects$ = new BehaviorSubject<number>(0);
  private readonly formError$ = new BehaviorSubject<ResponseError>(null);
  private readonly sortField$ = new BehaviorSubject<string>(null);
  private readonly sortDirection$ = new BehaviorSubject<string>(null);
  private readonly page$ = new BehaviorSubject<number>(this.INIT_PAGE);
  private readonly pageSize$ = new BehaviorSubject<number>(this.DEFAULT_PAGE_SIZE);
  private readonly search$ = new BehaviorSubject<SearchProject>(null);

  private selectedId: number;

  constructor() {
    super();
  }

  isUpdating$() {
    return this.updating$.asObservable();
  }

  setUpdating(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }

  isCompleted$() {
    return this.completed$.asObservable();
  }

  setCompleted(message: string) {
    this.completed$.next(message);
  }

  getSortField$() {
    return this.sortField$;
  }

  setSortField(field: string) {
    this.sortField$.next(field);
  }

  getSortDirection$() {
    return this.sortDirection$;
  }

  setSortDirection(direction: string) {
    this.sortDirection$.next(direction);
  }

  getSearch$() {
    return this.search$;
  }

  setSearch(search: SearchProject) {
    this.search$.next(search);
  }

  getTotalProjects$() {
    return this.totalProjects$;
  }

  setTotalProjects(total: number) {
    this.totalProjects$.next(total);
  }

  getPage$() {
    return this.page$;
  }

  setPage(page: number) {
    this.page$.next(page);
  }

  getPageSize$() {
    return this.pageSize$;
  }

  setPageSize(pageSize: number) {
    this.pageSize$.next(pageSize);
  }

  setErrorCompleted(error: Error) {
    this.completed$.error(error);
  }

  setProjects(projects: Project[]) {
    this.projects$.next(projects);
  }

  getProject$() {
    return this.project$.asObservable();
  }

  setProject(project: Project) {
    this.project$.next(project);
  }

  getFormError$() {
    return this.formError$.asObservable();
  }

  setFormError(formError: ResponseError) {
    this.formError$.next(formError);
  }

  setSelectedId(id: number) {
    this.selectedId = id;
  }

  getSelectedId(): number {
    return this.selectedId;
  }

  getError$() {
    return this.error$.asObservable();
  }

  setError(error: Error) {
    return this.error$.next(error);
  }



}
