import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListComponent } from './containers/projects-list/projects-list.component';
import { ProjectsFormComponent } from './containers/projects-form/projects-form.component';


const routes: Routes = [
    { path: 'new', component: ProjectsFormComponent },
    { path: 'edit/:id', component: ProjectsFormComponent },
    { path: '', component: ProjectsListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProjectsRoutingModule { }