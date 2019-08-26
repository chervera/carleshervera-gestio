import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PropertyError } from 'src/app/core/error-handler/response-error';

@Component({
  selector: 'mat-input-error',
  templateUrl: './input-error.component.html',
})
export class InputErrorComponent {

  @Input() control: FormControl;
  @Input() propertyError: PropertyError;

}
