import { Injectable } from '@angular/core';
import * as fromRoot from '@app/root-store';
import * as fromProjects from '@app/projects-store';
import { select, Store } from '@ngrx/store';

import { Project } from '../models/project';
import { create, load, remove, update } from '@app/projects-store/projects-actions';

@Injectable()
export class ProjectsStoreFacade {

  projects$ = this.store.pipe(
    select(fromProjects.getAllProjects)
  );

  constructor(private store: Store<fromRoot.State>) { }

  loadProject(id: number) {
    this.store.dispatch(load({ id }));
  }

  createProject(project: Project) {
    this.store.dispatch(create({ project }));
  }

  updateProject(project: Project) {
    this.store.dispatch(update({ project }));
  }

  deleteProject(id: number) {
    this.store.dispatch(remove({ id }));
  }

  getProjectById(id: number) {
    return this.store.pipe(
      select(fromProjects.getProjectById(id))
    )
  }
}
