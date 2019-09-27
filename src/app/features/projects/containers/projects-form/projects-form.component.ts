import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ResponseError } from 'src/app/core/error-handler/response-error';
import { Master } from '@app/core/master/models/master';
import { NotificationService } from 'src/app/core/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Project } from '../../state/project.model';
import { ProjectsQuery } from '../../state/projects.query';
import { RootQuery } from '@app/core/state/root.query';
import { RootService } from '@app/core/state/root.service';
import { ProjectsService } from '../../projects.service';
import { ProjectsAction } from '../../state/projects.action';

@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProjectsService]
})
export class ProjectsFormComponent implements OnInit {
  project$: Observable<Project>;
  departments$: Observable<Master[]>;
  apiErrors$: Observable<ResponseError>;

  isUpdating$: Observable<boolean>;
  isCompleted$: Observable<string>;

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private translateService: TranslateService,
    private service: ProjectsService,
    private query: ProjectsQuery,
    private rootService: RootService,
    private rootQuery: RootQuery,
    private action: ProjectsAction
  ) {
    this.isUpdating$ = this.query.selectLoading();
    this.project$ = this.query.selectProject();
    this.apiErrors$ = this.query.selectApiErrors();
    this.departments$ = this.rootQuery.selectDepartaments();
  }

  ngOnInit() {
    this.initProject();
    this.initMasters();
    this.initForm();
  }

  private initProject() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.service.loadProject(+this.route.snapshot.paramMap.get('id'));
    } else {
      this.action.newProject();
    }
  }

  private initMasters() {
    this.rootService.loadDepartaments();
  }

  private initForm() {
    this.form = this.buildForm();
    this.project$.subscribe(project => {
      if (project) {
        this.form.patchValue(project);
      }
    });
  }

  saveNewProject(project: Project) {
    this.service.saveNewProject(project).subscribe(() => {
      this.notificationService.showSuccess(
        this.translateService.instant('projects.messages.update.sucess')
      );
      this.goToList();
    });
  }

  saveUpdateProject(project: Project) {
    this.service.saveUpdateProject(project).subscribe(() => {
      this.notificationService.showSuccess(
        this.translateService.instant('projects.messages.insert.sucess')
      );
      this.goToList();
    });
  }

  saveProject() {
    let project: Project = this.getEditedProject();
    if (this.form.valid) {
      if (this.query.getProjectId()) {
        this.saveUpdateProject(project);
      } else {
        this.saveNewProject(project);
      }
    }
  }

  onSubmit() {
    this.saveProject();
  }

  onCancel() {
    this.goToList();
  }

  private goToList(): void {
    this.router.navigate(['projectes']);
  }

  private buildForm() {
    return this.formBuilder.group({
      code: [''],
      name: [''],
      responsable: [''],
      tecnicResponsable: [''],
      department: [''],
      codeINAP: [''],
      teamSize: [''],
      responsive: [''],
      mobileApp: [''],
      dblink: [''],
      webservice: [''],
      database: [''],
      ldap: [''],
      minBrowser: [''],
      accessLogs: [''],
      deployFrequency: [''],
      repositorySIC: [''],
      repositoryIndra: [''],
      automaticDeploy: [''],
      netFramework: [''],
      netIde: [''],
      netEntityFramework: [''],
      javaIde: [''],
      javaCanigoVersion: [''],
      javaFramework: [''],
      jsIde: [''],
      jsAngular: [''],
      jsAngularJS: [''],
      jsTypescript: [''],
      gicar: [''],
      valid: [''],
      pica: [''],
      ecopia: [''],
      sarcat: [''],
      smtp: [''],
      problems: ['']
    });
  }

  private getEditedProject(): Project {
    let project: Project = this.form.value;
    //project.id = this.projectsFacade.getSelectedId();
    return project;
  }
}
