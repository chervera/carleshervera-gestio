import { Injectable } from '@angular/core';
import { CoreState } from 'src/app/core/state/core.state';

@Injectable({
  providedIn: 'root'
})
export class UserFacade {

  constructor(
    private state: CoreState
  ) { }


  printState() {
    this.state.printGlobalState();
  }
}
