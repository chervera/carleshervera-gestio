import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Project } from '../../models/project';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResponseError } from 'src/app/core/error-handler/response-error';
import { MasterFacade } from 'src/app/main/master/master.facade';
import { Master } from 'src/app/main/master/models/master';
import { NotificationService } from 'src/app/core/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { ProjectsStoreFacade } from '@app/projects-store/projects.store-facade';
import { ProjectsEffects } from '@app/projects-store/projects-effects';

@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsFormComponent implements OnInit {
  departments$: Observable<Master[]>;
  formApiErrors$: Observable<ResponseError>;

  isUpdating$: Observable<boolean>;
  isCompleted$: Observable<string>;

  project$: Observable<Project>;

  form: FormGroup;
  redirectSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsFacade: ProjectsStoreFacade,
    private masterFacade: MasterFacade,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private translateService: TranslateService,
    private projectsEffects: ProjectsEffects,
  ) {
    /*this.isUpdating$ = projectsFacade.isUpdating$();
    this.departments$ = this.masterFacade.getDepartments$();
    this.isCompleted$ = this.projectsFacade.isCompleted$();
    */
  }

  ngOnInit() {
    //this.initProject();
    this.route.params.subscribe(params => {
      // update our id from the backend in case it was modified by another client
      this.projectsFacade.loadProject(+params.id);
      this.project$ = this.projectsFacade.getProjectById(params.id);
    });

    this.redirectSub = this.projectsEffects.update$.subscribe(action => this.router.navigate(['/projectes']));

    this.initMasters();
    this.initForm();
    this.isCompletedSubscription();
    this.errorFormSubscription();
  }

  private errorFormSubscription() {
    //this.formApiErrors$ = this.projectsFacade.getFormError$();
  }

  private isCompletedSubscription() {
    /*this.projectsFacade.initCompleted();
    this.isCompleted$.pipe(filter(data => data != null)).subscribe(message => {
      this.goToList();
    });
    */
  }

  private initMasters() {
    this.masterFacade.loadDepartments();
  }

  private initForm() {
    this.form = this.buildForm();
    this.project$.subscribe(project => {
      if (project) {
        this.form.patchValue(project);
      }
    });
  }

  loadProject(id: number) {
    this.projectsFacade.loadProject(id);
  }

  newProject() {
    //this.projectsFacade.addProject();
  }

  saveNewProject(project: Project) {
    //this.projectsFacade.saveNewProject(project).subscribe(() => this.notificationService.showSuccess(this.translateService.instant('projects.messages.insert.sucess')));
  }

  saveUpdateProject(project: Project) {
    //this.projectsFacade.saveUpdateProject(project).subscribe(() => this.notificationService.showSuccess(this.translateService.instant('projects.messages.update.sucess')));
    this.projectsFacade.updateProject(project);
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
      id: [''],
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
    return project;
  }
}
