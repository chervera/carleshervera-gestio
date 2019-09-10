import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';


const routes: Routes = [
  {
    path: 'projectes',
    loadChildren: () => import('./main/projects/projects.module').then(mod => mod.ProjectsModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'articles',
    loadChildren: () => import('./main/articles/articles.module').then(mod => mod.ArticlesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./main/user/user.module').then(mod => mod.UserModule),
  },
  {
    path: '',
    redirectTo: '/projectes',
    pathMatch: 'full'
  },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
