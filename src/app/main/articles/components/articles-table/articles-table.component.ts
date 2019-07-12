import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Article } from '../../models/article';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ArticlesDataSource } from './articles.data-source';
import { Observable } from 'rxjs';
import { ArticlesFacade } from '../../articles.facade';


@Component({
  selector: 'app-articles-table',
  templateUrl: './articles-table.component.html',
  styleUrls: ['./articles-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ArticlesTableComponent implements OnInit {

  @Input() private items$: Observable<Article[]>;

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  displayedColumns: string[] = ['id', 'title', 'short_description', 'actions'];
  dataSource: ArticlesDataSource;

  constructor(private articlesFacade: ArticlesFacade) { }

  ngOnInit() {
    //this.dataSource.paginator = this.paginator;
    this.dataSource = new ArticlesDataSource(this.articlesFacade);
    this.dataSource.loadArticles();
  }

  onEdit(id: number) {
    this.edit.emit(id);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }

}
