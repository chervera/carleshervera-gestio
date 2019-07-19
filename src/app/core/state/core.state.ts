import { Injectable } from '@angular/core';
import { ArticlesState } from 'src/app/main/articles/state/articles.state';
import { State } from './state';
import { AuthState } from 'src/app/core/state/auth.state';


@Injectable({
  providedIn: 'root'
})
export class CoreState extends State {

  constructor() {
    super();
  }

  auth: AuthState = new AuthState();
  articles: ArticlesState = new ArticlesState();


  printGlobalState() {
    const globalState = this.printState();
    console.log(globalState);
  }

}
