import { Injectable } from '@angular/core';
import { Project } from './project.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { SearchProject } from '../models/search-project';
import { ResponseError } from '@app/core/error-handler/response-error';

export interface ProjectsState extends EntityState<Project> {
  sortField: string;
  sortDirection: string;
  page: number;
  pageSize: number;
  totalItems: number;
  search: SearchProject;
  project: Project;
  apiErrors: ResponseError;
}

export function createInitialState() {
  return {
    page: FIRST_PAGE,
    pageSize: 3,
    totalItems: 0
  };
}

export const FIRST_PAGE = 0;

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'projects' })
export class ProjectsStore extends EntityStore<ProjectsState> {
  constructor() {
    super(createInitialState());
  }
}
