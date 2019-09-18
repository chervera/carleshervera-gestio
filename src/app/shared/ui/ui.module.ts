import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorComponent } from './input-error/input-error.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [InputErrorComponent],
  imports: [CommonModule, MatFormFieldModule],
  exports: [InputErrorComponent]
})
export class UiModule {}
