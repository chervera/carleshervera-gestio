import { Component, OnInit, Input } from '@angular/core';
import { ArticlesFacade } from '../../articles.facade';
import { Observable } from 'rxjs';
import { Article } from '../../models/article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {


  articles$: Observable<Article[]>;
  isUpdating$: Observable<boolean>;

  constructor(
    private articlesFacade: ArticlesFacade,
    private router: Router
  ) {
    this.isUpdating$ = articlesFacade.isUpdating$();
    this.articles$ = articlesFacade.getArticles$();
  }

  ngOnInit() {
    this.articlesFacade.loadArticles();
  }

  addArticle(article: Article) {
    //this.articlesFacade.addArticle(article);
  }

  editArticle(id: number) {
    this.router.navigate(['articles', id]);
  }

}
