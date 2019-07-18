import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Article } from '../../models/article';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ArticlesFacade } from '../../articles.facade';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-articles-form',
  templateUrl: './articles-form.component.html',
  styleUrls: ['./articles-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesFormComponent implements OnInit {

  article$: Observable<Article>;

  isUpdating$: Observable<boolean>;
  isCompleted$: Observable<string>;

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articlesFacade: ArticlesFacade,
    private formBuilder: FormBuilder,
  ) {
    this.isUpdating$ = articlesFacade.isUpdating$();
    this.article$ = this.articlesFacade.getArticle$();
    this.isCompleted$ = this.articlesFacade.isCompleted$();
  }

  ngOnInit() {

    this.initArticle();
    this.initForm();

    this.articlesFacade.initCompleted();
    this.isCompleted$.pipe(
      filter(data => data != null)
    ).subscribe(
      (message) => {
        console.debug(message);
        this.goToList();
      }
    );
  }

  private initArticle() {
    this.articlesFacade.setSelectedId(+this.route.snapshot.paramMap.get('id'));
    if (this.articlesFacade.getSelectedId()) {
      this.loadArticle(this.articlesFacade.getSelectedId());
    } else {
      this.newArticle();
    }
  }

  private initForm() {
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
    this.articlesFacade.addArticle();
  }

  saveNewArticle(article: Article) {
    this.articlesFacade.saveNewArticle(article);
  }

  saveUpdateArticle(article: Article) {
    this.articlesFacade.saveUpdateArticle(article);
  }

  saveArticle() {
    let article: Article = this.getEditedArticle();
    if (article.id) {
      this.saveUpdateArticle(article);
    } else {
      this.saveNewArticle(article);
    }
  }

  onSubmit() {
    this.saveArticle();
  }

  onCancel() {
    this.goToList();
  }

  private goToList(): void {
    this.router.navigate(['articles']);
  }

  private buildForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      short_description: ['', Validators.required],
      description: [''],
      created_on: [''],
      active: [''],
      slug: ['', Validators.required],
    });
  }

  private getEditedArticle(): Article {
    let article: Article = this.form.value;
    article.id = this.articlesFacade.getSelectedId();
    return article;
  }

}
