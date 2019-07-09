import { Component, OnInit, Input } from '@angular/core';
import { ArticlesFacade } from '../../articles.facade';
import { Observable } from 'rxjs';
import { Article } from '../../models/article';

@Component({
  selector: 'app-articles',
  templateUrl: './articlesList.component.html',
  styleUrls: ['./articlesList.component.css']
})
export class ArticlesListComponent implements OnInit {


  newArticle: Article = new Article();
  articles$: Observable<Article[]>;
  isUpdating$: Observable<boolean>;

  constructor(private articlesFacade: ArticlesFacade) {
    this.isUpdating$ = articlesFacade.isUpdating$();
    this.articles$ = articlesFacade.getArticles$();
  }

  ngOnInit() {
    this.articlesFacade.loadArticles();
  }

  addArticle(article: Article) {
    //this.articlesFacade.addArticle(article);
  }

  updateArticle(article: Article) {
    //this.articlesFacade.updateArticle(article);
  }


}
