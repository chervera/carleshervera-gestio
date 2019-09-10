import { BehaviorSubject, Observable } from 'rxjs';

export class State {
  printState() {
    let state: Object = {};
    let key: string;
    let value: State;
    for (let [key, value] of Object.entries(this)) {
      if (value instanceof State) {
        state[key] = value.printState();
      } else if (value instanceof BehaviorSubject) {
        state[key] = value.value;
      } else {
        state[key] = value;
      }
    }
    return state;
  };

  private isObservable(property: string): boolean {
    if (!this[property] || !this[property].asObservable) {
      console.debug('Property not exist or is not an observable');
      return false;
    }
    return true;
  }

  select(property: string): Observable<any> {
    if (this.isObservable(property)) {
      return this[property].asObservable();
    }
  }

  set(property: string, value: any): void {
    if (this.isObservable(property)) {
      this[property].next(value);
    }
  }
}
