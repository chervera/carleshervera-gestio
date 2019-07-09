import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './containers/articlesList/articlesList.component';


const routes: Routes = [
    { path: 'list', component: ArticlesListComponent },
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