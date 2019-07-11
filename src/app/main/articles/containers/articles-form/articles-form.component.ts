import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ArticlesFacade } from '../../articles.facade';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-articles-form',
  templateUrl: './articles-form.component.html',
  styleUrls: ['./articles-form.component.css']
})
export class ArticlesFormComponent implements OnInit {

  article$: Observable<Article>;
  isUpdating$: Observable<boolean>;

  selectedId: number;

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private articlesFacade: ArticlesFacade,
    private formBuilder: FormBuilder,
  ) {
    this.isUpdating$ = articlesFacade.isUpdating$();
    this.article$ = this.articlesFacade.getArticle$();
  }

  ngOnInit() {

    this.selectedId = +this.route.snapshot.paramMap.get('id');
    if (this.selectedId) {
      this.loadArticle(+this.selectedId);
    } else {
      this.newArticle();
    }

    this.form = this.buildForm();


    this.article$.subscribe(article => {
      if (article) {
        this.form.patchValue(article)
      }
    });
  }

  loadArticle(id: number) {
    this.articlesFacade.loadArticle(id);
  }

  newArticle() {

  }

  private buildForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      short_description: ['', Validators.required],
    });
  }

}
