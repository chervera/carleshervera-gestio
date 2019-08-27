import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { CoreDataSource } from 'src/app/core/data-source/data-source';
import { Article } from '../../models/article';


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

  @Input() articles$: Observable<Article[]>;
  @Input() totalArticles$: Observable<number>;
  @Input() loading$: Observable<boolean>;


  dataSource: CoreDataSource<Article>;
  dataColumns: string[] = ['id', 'title', 'short_description'];
  displayedColumns: string[] = [...this.dataColumns, 'actions']


  pageSizeOptions = [3, 6, 12];

  constructor() { }

  ngOnInit() {
    this.dataSource = new CoreDataSource<Article>(this.articles$);
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
