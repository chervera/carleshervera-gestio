import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Project } from '../../models/project';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProjectsFacade } from '../../projects.facade';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResponseError } from 'src/app/core/error-handler/response-error';
import { MasterFacade } from 'src/app/main/master/master.facade';
import { Master } from 'src/app/main/master/models/master';
import { NotificationService } from 'src/app/core/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsFormComponent implements OnInit {

  project$: Observable<Project>;
  departments$: Observable<Master[]>;
  formApiErrors$: Observable<ResponseError>

  isUpdating$: Observable<boolean>;
  isCompleted$: Observable<string>;

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsFacade: ProjectsFacade,
    private masterFacade: MasterFacade,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private translateService: TranslateService

  ) {
    this.isUpdating$ = projectsFacade.isUpdating$();
    this.project$ = this.projectsFacade.getProject$();
    this.departments$ = this.masterFacade.getDepartments$()
    this.isCompleted$ = this.projectsFacade.isCompleted$();
  }

  ngOnInit() {
    this.initProject();
    this.initMasters();
    this.initForm();
    this.isCompletedSubscription();
    this.errorFormSubscription();
  }

  private errorFormSubscription() {
    this.formApiErrors$ = this.projectsFacade.getFormError$();
  }

  private isCompletedSubscription() {
    this.projectsFacade.initCompleted();
    this.isCompleted$.pipe(
      filter(data => data != null)
    ).subscribe(
      (message) => {
        this.goToList();
      }
    );
  }

  private initProject() {
    this.projectsFacade.setSelectedId(+this.route.snapshot.paramMap.get('id'));
    if (this.projectsFacade.getSelectedId()) {
      this.loadProject(this.projectsFacade.getSelectedId());
    } else {
      this.newProject();
    }
  }

  private initMasters() {
    this.masterFacade.loadDepartments();
  }

  private initForm() {
    this.form = this.buildForm();
    this.project$.subscribe(project => {
      if (project) {
        this.form.patchValue(project)
      }
    });
  }

  loadProject(id: number) {
    this.projectsFacade.loadProject(id);
  }

  newProject() {
    this.projectsFacade.addProject();
  }

  saveNewProject(project: Project) {
    this.projectsFacade.saveNewProject(project).subscribe(
      () => this.notificationService.showSuccess(this.translateService.instant('projects.messages.insert.sucess'))
    );
  }

  saveUpdateProject(project: Project) {
    this.projectsFacade.saveUpdateProject(project).subscribe(
      () => this.notificationService.showSuccess(this.translateService.instant('projects.messages.update.sucess'))
    )
  }

  saveProject() {
    let project: Project = this.getEditedProject();
    if (this.form.valid) {
      if (project.id) {
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
      problems: [''],
    });
  }

  private getEditedProject(): Project {
    let project: Project = this.form.value;
    project.id = this.projectsFacade.getSelectedId();
    return project;
  }

}
