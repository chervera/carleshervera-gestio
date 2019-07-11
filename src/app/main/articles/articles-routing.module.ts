import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './containers/articles-list/articles-list.component';
import { ArticlesFormComponent } from './containers/articles-form/articles-form.component';


const routes: Routes = [
    { path: ':id', component: ArticlesFormComponent },
    { path: '', component: ArticlesListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ArticlesRoutingModule { }