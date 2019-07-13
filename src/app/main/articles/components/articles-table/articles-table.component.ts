import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Article } from '../../models/article';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ArticlesDataSource } from './articles.data-source';
import { Observable } from 'rxjs';
import { ArticlesFacade } from '../../articles.facade';
import { MatSort, Sort } from '@angular/material/sort';


@Component({
  selector: 'app-articles-table',
  templateUrl: './articles-table.component.html',
  styleUrls: ['./articles-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ArticlesTableComponent implements OnInit {

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  displayedColumns: string[] = ['id', 'title', 'short_description', 'actions'];
  dataSource: ArticlesDataSource;

  constructor(
    private articlesFacade: ArticlesFacade
  ) { }

  ngOnInit() {
    this.dataSource = new ArticlesDataSource(this.articlesFacade.getArticles$());
    this.articlesFacade.loadArticles();
  }

  onEdit(id: number) {
    this.edit.emit(id);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }

  onSort(sort: Sort) {
    this.articlesFacade.setSort(sort);
  }

  onPaginate(page: PageEvent) {
    this.articlesFacade.setPage(page);
  }

}
