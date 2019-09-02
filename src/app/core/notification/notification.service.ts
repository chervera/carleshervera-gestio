import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private configuration = new MatSnackBarConfig();

  constructor(public snackBar: MatSnackBar) {
    this.configuration.duration = environment.core.notification.duration;
    this.configuration.horizontalPosition = "center";
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'X', { ...this.configuration, panelClass: ['success'] });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'X', { ...this.configuration, panelClass: ['error'] });
  }
}
