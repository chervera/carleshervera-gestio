import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ArticlesFacade } from '../../articles.facade';
import { Observable } from 'rxjs';
import { Article } from '../../models/article';
import { Router } from '@angular/router';


@Component({
  selector: 'app-articles',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesListComponent implements OnInit {

  articles$: Observable<Article[]>;
  totalArticles$: Observable<number>;
  isUpdating$: Observable<boolean>;

  constructor(
    private articlesFacade: ArticlesFacade,
    private router: Router
  ) {
    this.isUpdating$ = articlesFacade.isUpdating$();
    this.articles$ = articlesFacade.getArticles$();
    this.totalArticles$ = articlesFacade.getTotalArticles$();
  }

  ngOnInit() {
    this.articlesFacade.loadArticles();
  }

  onAdd() {
    this.router.navigate(['articles/new']);
  }

  editArticle(id: number) {
    this.router.navigate(['articles/edit', id]);
  }

  deleteArticle(id: number) {
    this.articlesFacade.deleteArticle(id);
  }


}
