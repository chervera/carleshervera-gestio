import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesListComponent } from './containers/articles-list/articles-list.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesTableComponent } from './components/articles-table/articles-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ArticlesFormComponent } from './containers/articles-form/articles-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ExportModule } from '@app/core/export/export.module';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { MatSelectModule } from '@angular/material/select';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    ArticlesListComponent,
    ArticlesTableComponent,
    ArticlesFormComponent
  ],
  imports: [
    CoreModule,
    ArticlesRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    ExportModule,
    MatSelectModule,
    UiModule
  ]
})
export class ArticlesModule { }
