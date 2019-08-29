import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { State } from 'src/app/core/state/state';
import { Master } from '../models/master';

@Injectable({
  providedIn: 'root'
})
export class MasterState extends State {

  readonly NOT_COMPLETED = null;

  private readonly departments$ = new BehaviorSubject<Master[]>(null);
  private readonly updating$ = new BehaviorSubject<boolean>(false);
  private readonly completed$ = new BehaviorSubject<string>(this.NOT_COMPLETED);
  private readonly error$ = new BehaviorSubject<Error>(null);

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

  getDepartments$() {
    return this.departments$.asObservable();
  }

  setDepartments(departments: Master[]) {
    this.departments$.next(departments);
  }

  getError$() {
    return this.error$.asObservable();
  }

  setError(error: Error) {
    return this.error$.next(error);
  }

}
