import { BehaviorSubject } from 'rxjs';

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
}