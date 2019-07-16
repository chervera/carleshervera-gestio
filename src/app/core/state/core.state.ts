import { Injectable } from '@angular/core';
import { ArticlesState } from 'src/app/main/articles/state/articles.state';
import { State } from './state';


@Injectable({
  providedIn: 'root'
})
export class CoreState extends State {

  constructor() {
    super();
  }

  articles: ArticlesState = new ArticlesState();

  printGlobalState() {
    let globalState = this.printState();
    console.log(globalState);
  }

}
