import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ArticlesFacade } from '../../articles.facade';
import { Observable } from 'rxjs';
import { Article } from '../../models/article';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ExportService } from '@app/core/export/export.service';
import { ArticlesTableComponent } from '../../components/articles-table/articles-table.component';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-articles',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesListComponent implements OnInit {

  articles$: Observable<Article[]>;
  error$: Observable<Article[]>;
  totalArticles$: Observable<number>;
  isUpdating$: Observable<boolean>;
  itemsPerPage: number = 3;

  @ViewChild(ArticlesTableComponent, { static: true }) articlesTable: ArticlesTableComponent;

  constructor(
    private articlesFacade: ArticlesFacade,
    private router: Router,
    private exportService: ExportService
  ) {
    this.isUpdating$ = articlesFacade.isUpdating$();
    this.articles$ = articlesFacade.getArticles$();
    this.error$ = articlesFacade.getError$();
    this.totalArticles$ = articlesFacade.getTotalArticles$();
    this.articlesFacade.setPageSize(this.itemsPerPage);

  }

  ngOnInit() {
    this.articlesFacade.loadArticles();
  }

  onAdd() {
    this.router.navigate(['articles/new']);
  }

  onExport() {
    this.articles$.pipe(
      take(1),
      tap((data: Article[]) => {
        const preparedToExport = this.exportService.prepareToExport(data, this.articlesTable.dataColumns);
        this.exportService.exportAsExcelFile(preparedToExport, 'name-of-the-file');;
      })
    ).subscribe();
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
