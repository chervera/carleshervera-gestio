import { Injectable } from '@angular/core';
import { ProjectsStore, FIRST_PAGE } from './projects.store';
import { Project, createProject } from './project.model';
import { SearchProject } from '../models/search-project';
import { action, transaction } from '@datorama/akita';

@Injectable()
export class ProjectsAction {
  constructor(protected store: ProjectsStore) {}

  @action('updateProjects')
  @transaction()
  updateProjects(projects: Project[], totalItems: number) {
    this.store.set(projects);
    this.store.update({
      totalItems: totalItems
    });
  }

  @action('updateProject')
  updateProject(project: Project) {
    this.store.update({ project: project });
  }

  @action('newProject')
  newProject() {
    this.store.update({ project: createProject({}) });
  }

  @action('updatePagination')
  updatePagination(pageIndex: number, pageSize: number) {
    this.store.update({
      page: pageIndex,
      pageSize: pageSize
    });
  }

  @action('updateSort')
  updateSort(active: string, direction: string) {
    this.store.update({
      page: FIRST_PAGE,
      sortField: active,
      sortDirection: direction
    });
  }

  @action('updateFilters')
  updateFilters(filters: SearchProject) {
    this.store.update({
      search: filters
    });
  }

  @action('updateApiErrors')
  updateApiErrors(error) {
    this.store.update({
      apiErrors: error
    });
  }

  setLoading(loading: boolean) {
    this.store.setLoading(loading);
  }
}
