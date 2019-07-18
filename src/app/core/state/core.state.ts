import { Injectable } from '@angular/core';
import { ArticlesState } from 'src/app/main/articles/state/articles.state';
import { State } from './state';
import { UserState } from 'src/app/main/user/state/user.state';


@Injectable({
  providedIn: 'root'
})
export class CoreState extends State {

  constructor() {
    super();
  }

  user: UserState = new UserState();
  articles: ArticlesState = new ArticlesState();


  printGlobalState() {
    let globalState = this.printState();
    console.log(globalState);
  }

}
