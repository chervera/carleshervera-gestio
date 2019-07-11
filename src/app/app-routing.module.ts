import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'articles',
    loadChildren: () => import('./main/articles/articles.module').then(mod => mod.ArticlesModule),
  },
  {
    path: '',
    redirectTo: '/articles',
    pathMatch: 'full'
  },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
