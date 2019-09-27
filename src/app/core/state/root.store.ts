import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';
import { Master } from '../master/models/master';

export interface RootState {
  auth: AuthState;
  departaments: Master[];
}

export interface AuthState {
  token: string;
  user: any;
}

export function createInitialState(): RootState {
  return {
    departaments: [],
    auth: {
      token: '',
      user: {}
    }
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'root' })
export class RootStore extends Store<RootState> {
  constructor() {
    super(createInitialState());
  }
}
