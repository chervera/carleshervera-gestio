import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ProjectsFacade } from '../../projects.facade';
import { Observable } from 'rxjs';
import { Project } from '../../models/project';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ExportService } from 'src/app/shared/export/export.service';
import { ProjectsTableComponent } from '../../components/projects-table/projects-table.component';
import { tap, take } from 'rxjs/operators';
import { SearchProject } from '../../models/search-project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsListComponent implements OnInit {

  projects$: Observable<Project[]>;
  error$: Observable<Project[]>;
  totalProjects$: Observable<number>;
  isUpdating$: Observable<boolean>;
  itemsPerPage: number = 3;

  @ViewChild(ProjectsTableComponent, { static: true }) projectsTable: ProjectsTableComponent;

  constructor(
    private projectsFacade: ProjectsFacade,
    private router: Router,
    private exportService: ExportService
  ) {
    this.isUpdating$ = projectsFacade.isUpdating$();
    this.projects$ = projectsFacade.getProjects$();
    this.error$ = projectsFacade.getError$();
    this.totalProjects$ = projectsFacade.getTotalProjects$();
    this.projectsFacade.setPageSize(this.itemsPerPage);

  }

  ngOnInit() {
    this.projectsFacade.loadProjects();
  }

  onAdd() {
    this.router.navigate(['projects/new']);
  }

  onExport() {
    this.projects$.pipe(
      take(1),
      tap((data: Project[]) => {
        const preparedToExport = this.exportService.prepareToExport(data, this.projectsTable.dataColumns);
        this.exportService.exportAsExcelFile(preparedToExport, 'name-of-the-file');;
      })
    ).subscribe();
  }

  editProject(id: number) {
    this.router.navigate(['projectes/edit', id]);
  }

  deleteProject(id: number) {
    this.projectsFacade.deleteProject(id);
  }

  onPaginate(page: PageEvent) {
    this.projectsFacade.setPage(page.pageIndex);
    this.projectsFacade.setPageSize(page.pageSize);
    this.projectsFacade.loadProjects();
  }

  onSort(sort: Sort) {
    this.projectsFacade.setSortField(sort.active);
    this.projectsFacade.setSortDirection(sort.direction);
    this.projectsFacade.loadProjects();
  }

  onSearch(search: SearchProject) {
    this.projectsFacade.setSearch(search);
    this.projectsFacade.setSortField(null);
    this.projectsFacade.setSortDirection(null);
    this.projectsFacade.setInitPage();
    this.projectsFacade.loadProjects();
  }

}
