import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
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
  @Output() sort = new EventEmitter<Sort>();
  @Output() paginate = new EventEmitter<PageEvent>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sorter: MatSort;

  @Input() dataSource: ArticlesDataSource;


  dataColumns: string[] = ['id', 'title', 'short_description'];
  displayedColumns: string[] = [...this.dataColumns, 'actions']
  totalArticles: Observable<number>;

  pageSizeOptions = [3, 6, 12];

  constructor(
    private articlesFacade: ArticlesFacade
  ) { }

  ngOnInit() {
    this.totalArticles = this.articlesFacade.getTotalArticles$();
  }

  onEdit(id: number) {
    this.edit.emit(id);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }

  onSort(sort: Sort) {
    this.sort.emit(sort);
  }

  onPaginate(page: PageEvent) {
    this.paginate.emit(page);
  }

}
