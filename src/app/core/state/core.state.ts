import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ArticlesState } from 'src/app/main/articles/state/articles.state';


@Injectable({
  providedIn: 'root'
})
export class CoreState {

  constructor() { }

  articles: ArticlesState = new ArticlesState();

}
