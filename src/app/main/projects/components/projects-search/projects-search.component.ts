import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { SearchProject } from '../../models/search-project';

@Component({
  selector: 'app-projects-search',
  templateUrl: './projects-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsSearchComponent implements OnInit {

  @Input() searchProject: SearchProject;

  @Output() search = new EventEmitter<SearchProject>();

  constructor() { }

  ngOnInit() {
    this.searchProject = new SearchProject();
  }

  onSearch() {
    this.search.emit(this.searchProject);
  }

  onReset() {
    this.searchProject = new SearchProject();
    this.onSearch();
  }

}
