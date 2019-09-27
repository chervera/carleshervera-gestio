import { Injectable } from '@angular/core';
import { QueryEntity, ID } from '@datorama/akita';
import { ProjectsStore, ProjectsState } from './projects.store';

@Injectable({ providedIn: 'root' })
export class ProjectsQuery extends QueryEntity<ProjectsState> {
  constructor(protected store: ProjectsStore) {
    super(store);
  }

  selectTotalItems() {
    return this.select('totalItems');
  }

  selectProject() {
    return this.select('project');
  }

  selectApiErrors() {
    return this.select(state => state.apiErrors);
  }

  getProjectId(): ID {
    return this.getValue().project.id;
  }
}
