import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ExportService } from '@app/core/export/export.service';
import { ProjectsTableComponent } from '../../components/projects-table/projects-table.component';
import { tap, take } from 'rxjs/operators';
import { SearchProject } from '../../models/search-project';
import { NotificationService } from '@app/core/notification/notification.service';
import { ProjectsQuery } from '../../state/projects.query';
import { Project } from '../../state/project.model';
import { ProjectsService } from '../../projects.service';
import { ProjectsAction } from '../../state/projects.action';
import { ProjectsApi } from '../../api/projects.api';

@Component({
  selector: 'app-projects',
  templateUrl: './projects-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProjectsService, ProjectsAction]
})
export class ProjectsListComponent implements OnInit {
  projects$: Observable<Project[]>;
  error$: Observable<Project[]>;
  totalProjects$: Observable<number>;
  isUpdating$: Observable<boolean>;
  itemsPerPage: number;

  @ViewChild(ProjectsTableComponent, { static: true })
  projectsTable: ProjectsTableComponent;

  constructor(
    private router: Router,
    private exportService: ExportService,
    private notificationService: NotificationService,
    private projectsService: ProjectsService,
    private query: ProjectsQuery,
    private action: ProjectsAction
  ) {
    this.projects$ = this.query.selectAll();
    this.isUpdating$ = this.query.selectLoading();
    this.totalProjects$ = this.query.selectTotalItems();
    this.error$ = this.query.selectError();
  }

  ngOnInit() {
    this.projectsService.loadProjects();
  }

  onAdd() {
    this.router.navigate(['projectes/new']);
  }

  onExport() {
    this.projects$
      .pipe(
        take(1),
        tap((data: Project[]) => {
          const preparedToExport = this.exportService.prepareToExport(
            data,
            this.projectsTable.dataColumns
          );
          this.exportService.exportAsExcelFile(
            preparedToExport,
            'name-of-the-file'
          );
        })
      )
      .subscribe();
  }

  editProject(id: number) {
    this.router.navigate(['projectes/edit', id]);
  }

  deleteProject(id: number) {
    this.projectsService.deleteProject(id).subscribe(() => {
      this.notificationService.showSuccess('Eliminat correctament');
      this.projectsService.loadProjects();
    });
  }

  onPaginate(page: PageEvent) {
    this.projectsService.paginate(page.pageIndex, page.pageSize);
  }

  onSort(sort: Sort) {
    this.projectsService.sort(sort.active, sort.direction);
  }

  onSearch(search: SearchProject) {
    this.projectsService.search(search);
  }
  onReset() {
    this.projectsService.search({});
  }
}
