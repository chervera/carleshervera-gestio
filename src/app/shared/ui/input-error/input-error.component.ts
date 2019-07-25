import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mat-input-error',
  templateUrl: './input-error.component.html',
  styles: []
})
export class InputErrorComponent implements OnInit {

  @Input() control: FormControl;

  constructor() {

  }

  ngOnInit() {
  }

}
