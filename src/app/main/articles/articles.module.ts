import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesListComponent } from './containers/articlesList/articlesList.component';
import { ArticlesRoutingModule } from './articles-routing.module';

@NgModule({
  declarations: [ArticlesListComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
