
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import {
  createSuccess,
  loadAllSuccess,
  loadSuccess, removeSuccess,
  updateSuccess, setTotalProjects
} from '@app/projects-store/projects-actions';
import { Project } from '../models/project';
import { setState } from '@app/core/helpers/ngrx.helpers';

// This adapter will allow is to manipulate projects (mostly CRUD operations)
export const projectsAdapter = createEntityAdapter<Project>({
  selectId: (project: Project) => project.id,
  sortComparer: false
});

// -----------------------------------------
// The shape of EntityState
// ------------------------------------------
// interface EntityState<Project> {
//   ids: string[] | number[];
//   entities: { [id: string]: Project };
// }
// -----------------------------------------
// -> ids arrays allow us to sort data easily
// -> entities map allows us to access the data quickly without iterating/filtering though an array of objects

export interface State extends EntityState<Project> {
  totalProjects: number;

}

export const INIT_STATE: State = projectsAdapter.getInitialState({
  totalProjects: 0
});

export const reducer = createReducer<State>(
  INIT_STATE,
  on(loadAllSuccess, (state, { projects }) =>
    projectsAdapter.addAll(projects.body, state)
  ),
  on(loadSuccess, (state, { project }) =>
    projectsAdapter.upsertOne(project, state)
  ),
  on(createSuccess, (state, { project }) =>
    projectsAdapter.addOne(project, state)
  ),
  on(updateSuccess, (state, { project }) =>
    projectsAdapter.updateOne({ id: project.id, changes: project }, state)
  ),
  on(removeSuccess, (state, { id }) =>
    projectsAdapter.removeOne(id, state)
  ),
  on(setTotalProjects, (state, { payload: totalProjects }) =>
    setState({ totalProjects }, state)
  )
);

export const getProjectById = (id: number) => (state: State) => state.entities[id];