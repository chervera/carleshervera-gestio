import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PropertyError } from './input-error';

@Component({
  selector: 'mat-input-error',
  templateUrl: './input-error.component.html',
})
export class InputErrorComponent {

  @Input() control: FormControl;
  @Input() apiError: PropertyError;

}
