import { NgModule } from '@angular/core';
import { ProjectsListComponent } from './containers/projects-list/projects-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsTableComponent } from './components/projects-table/projects-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ProjectsFormComponent } from './containers/projects-form/projects-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ExportModule } from '@app/core/export/export.module';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { MatSelectModule } from '@angular/material/select';
import { CoreModule } from 'src/app/core/core.module';
import { ProjectsSearchComponent } from './components/projects-search/projects-search.component';
import { MasterModule } from '@app/core/master/master.module';
import { ProjectsFacade } from './projects.facade';



@NgModule({
  declarations: [
    ProjectsListComponent,
    ProjectsTableComponent,
    ProjectsFormComponent,
    ProjectsSearchComponent
  ],
  imports: [
    CoreModule,
    FormsModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    ExportModule,
    UiModule,
    MasterModule
  ],
  providers: [
    ProjectsFacade
  ]
})
export class ProjectsModule { }
