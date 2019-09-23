import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, pluck, startWith, switchMap, tap } from 'rxjs/operators';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { ProjectsApi } from '../api/projects.api';
import { create, createSuccess, failure, load, loadAll, loadAllSuccess, loadSuccess, remove, removeSuccess, update, updateSuccess, setTotalProjects } from '@app/projects-store/projects-actions';
import { HttpResponse } from '@angular/common/http';

/**
 * Effects file is for isolating and managing side effects of the application in one place
 * Http requests, Sockets, Routing, LocalStorage, etc
 */

@Injectable()
export class ProjectsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAll) /* When action is dispatched */,
      startWith(loadAll()),
      /* Hit the Projects Index endpoint of our REST API */
      /* Dispatch LoadAllSuccess action to the central store with id list returned by the backend as id*/
      /* 'Projects Reducers' will take care of the rest */
      switchMap(() => this.projectsApi.getProjects().pipe(map(projects => loadAllSuccess({ projects })))),
    ),
  );

  loadAllSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllSuccess),
      pluck('projects'),
      map(response => setTotalProjects({ payload: +response.headers.get(this.projectsApi.HEADER_TOTAL_ITEMS) })),
    ),
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      pluck('id'),
      switchMap(id => this.projectsApi.getProject(id).pipe(map(project => loadSuccess({ project })))),
    ),
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(update),
      pluck('project'),
      exhaustMap(project => this.projectsApi.update(project).pipe(map(project => updateSuccess({ project })))),
    ),
  );

  /*
    create$ = createEffect(() => this.actions$.pipe(
      ofType(create),
      pluck('contact'),
      switchMap(contact => this.contactsService.create(contact).pipe(
        map(contact => createSuccess({ contact })),
        catchError(err => {
          alert(err.message);
          return of(failure({ err: { concern: 'CREATE', error: err } }));
        })
      ))
    ));
  
  
   
  
    destroy$ = createEffect(() => this.actions$.pipe(
      ofType(remove),
      pluck('id'),
      switchMap(id => this.contactsService.destroy(id).pipe(
        pluck('id'),
        map(id => removeSuccess({ id }))
      ))
    ));
  */
  constructor(private actions$: Actions, private projectsApi: ProjectsApi) {}
}
