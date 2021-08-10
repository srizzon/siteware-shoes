import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
export class ConfirmDialogInterface {
  title: any;
  subtitle: any;
  descriptionFirst?: any;
  descriptionSecond?: any;
  onlyOkButton?: boolean;
}
@Component({
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogInterface) {}
}
