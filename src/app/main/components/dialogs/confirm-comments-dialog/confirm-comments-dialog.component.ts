import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

export interface ConfirmCommentsDialogInterface {
  title: string;
  text: string;
  comments: string;
}

export interface ConfirmCommentsDialogForm {
  comments: string;
}
@Component({
  templateUrl: './confirm-comments-dialog.component.html',
  styleUrls: ['./confirm-comments-dialog.component.scss'],
})
export class ConfirmCommentsDialogComponent {

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmCommentsDialogInterface,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      comments: ['', [Validators.required]],
    });
  }

  fillComments() {
    const values: ConfirmCommentsDialogForm = this.form.getRawValue();
    this.data.comments = values.comments;
  }
}
