import { Injectable } from '@angular/core';
import { ArticlesState } from 'src/app/main/articles/state/articles.state';
import { State } from './state';
import { AuthState } from 'src/app/core/state/auth.state';
import { ProjectsState } from 'src/app/main/projects/state/projects.state';
import { MasterState } from 'src/app/main/master/state/master.state';


@Injectable({
  providedIn: 'root'
})
export class CoreState extends State {

  constructor() {
    super();
  }

  auth: AuthState = new AuthState();
  master: MasterState = new MasterState();
  articles: ArticlesState = new ArticlesState();
  projects: ProjectsState;


  printGlobalState() {
    const globalState = this.printState();
    console.log(globalState);
  }

}
