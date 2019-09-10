import { createAction, props } from '@ngrx/store';
import { Project } from '../models/project';
import { HttpResponse } from '@angular/common/http';

const ENTITY_NAME = 'PROJECTS';

export const loadAll = createAction(
  `[${ENTITY_NAME}] Load all`
);

export const load = createAction(
  `[${ENTITY_NAME}] Load`,
  props<{ id: number }>()
);

export const create = createAction(
  `[${ENTITY_NAME}] Create`,
  props<{ project: Project }>()
);

export const update = createAction(
  `[${ENTITY_NAME}] Update`,
  props<{ project: Partial<Project> }>()
);

export const remove = createAction(
  `[${ENTITY_NAME}] Remove`,
  props<{ id: number }>()
);

export const loadAllSuccess = createAction(
  `[${ENTITY_NAME}] Load all success`,
  props<{ projects: HttpResponse<Project[]> }>()
);

export const loadSuccess = createAction(
  `[${ENTITY_NAME}] Load success`,
  props<{ 'project': Project }>()
);

export const createSuccess = createAction(
  `[${ENTITY_NAME}] Create success`,
  props<{ project: Project }>()
);

export const updateSuccess = createAction(
  `[${ENTITY_NAME}] Update success`,
  props<{ project: Partial<Project> }>()
);


export const removeSuccess = createAction(
  `[${ENTITY_NAME}] Remove success`,
  props<{ id: number }>()
);


export const failure = createAction(
  `[${ENTITY_NAME}] Failure`,
  props<{ err: { concern: 'CREATE' | 'PATCH', error: any } }>()
);

export const setTotalProjects = createAction(
  `[${ENTITY_NAME}] Set total projects`,
  props<{ payload: number }>()
);