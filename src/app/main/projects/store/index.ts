import * as fromProjects from './projects-reducer';
import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProjectsState {
  projects: fromProjects.State;
}

/** Provide reducers with AoT-compilation compliance */
export function reducers(state: ProjectsState | undefined, action: Action) {
  return combineReducers({
    projects: fromProjects.reducer
  })(state, action)
}


/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */

export const getProjectsState = createFeatureSelector<ProjectsState>('projects');

export const getProjectsEntitiesState = createSelector(
  getProjectsState,
  state => state.projects
);

export const {
  selectAll: getAllProjects,
} = fromProjects.projectsAdapter.getSelectors(getProjectsEntitiesState);

export const getProjectById = (id: number) => createSelector(
  getProjectsEntitiesState,
  fromProjects.getProjectById(id)
);