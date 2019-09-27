import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { SearchProject } from '../../models/search-project';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-projects-search',
  templateUrl: './projects-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsSearchComponent implements OnInit {
  @Output() search = new EventEmitter<SearchProject>();
  @Output() reset = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.buildForm();
  }

  onSearch() {
    if (this.form.valid) {
      this.search.emit(this.form.value);
    }
  }

  onReset() {
    this.form.reset();
    this.search.emit(this.form.value);
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      code: [''],
      name: ['']
    });
  }
}
