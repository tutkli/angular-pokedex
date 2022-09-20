import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private snackBack: MatSnackBar) {}

  /**
   * Show a little dialog with a specific message
   * @param message Message to be shown
   */
  showMessage(message: string): void {
    this.snackBack.open(message, undefined, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
