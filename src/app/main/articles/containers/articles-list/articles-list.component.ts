import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ArticlesFacade } from '../../articles.facade';
import { Observable } from 'rxjs';
import { Article } from '../../models/article';
import { Router } from '@angular/router';
import { ArticlesDataSource } from '../../components/articles-table/articles.data-source';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';


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
  dataSource: ArticlesDataSource;
  itemsPerPage: number = 3;

  constructor(
    private articlesFacade: ArticlesFacade,
    private router: Router
  ) {
    this.isUpdating$ = articlesFacade.isUpdating$();
    this.articles$ = articlesFacade.getArticles$();
    this.totalArticles$ = articlesFacade.getTotalArticles$();
    this.articlesFacade.setPageSize(this.itemsPerPage);
    this.dataSource = new ArticlesDataSource(this.articlesFacade.getArticles$());
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

  onPaginate(page: PageEvent) {
    this.articlesFacade.setPage(page.pageIndex);
    this.articlesFacade.setPageSize(page.pageSize);
    this.articlesFacade.loadArticles();
  }

  onSort(sort: Sort) {
    this.articlesFacade.setSortField(sort.active);
    this.articlesFacade.setSortDirection(sort.direction);
    this.articlesFacade.loadArticles();
  }


}
