import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-description-snackbar',
  templateUrl: './description-snackbar.component.html',
  styleUrl: './description-snackbar.component.scss'
})
export class DescriptionSnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: string,
    private snackBarRef: MatSnackBarRef<DescriptionSnackbarComponent>
  ) { }
  close() {
    this.snackBarRef.dismiss();
  }
}
