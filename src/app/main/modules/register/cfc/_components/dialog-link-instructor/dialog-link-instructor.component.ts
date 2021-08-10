import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { InstrutorModel } from '@models/gestao/instrutor.model';
import { InstrutorService } from '@services/apis/gestao/instrutor.service';
import { Toast } from '@services/outros/toast.service';

@Component({
  selector: 'app-dialog-link-instructor',
  templateUrl: './dialog-link-instructor.component.html',
  styleUrls: ['./dialog-link-instructor.component.scss']
})
export class DialogLinkInstructorComponent implements OnInit {

  instructorForm: FormGroup;
  instructor: InstrutorModel = new InstrutorModel();

  constructor(
    private _dialogRef: MatDialogRef<DialogLinkInstructorComponent>,
    private _formBuider: FormBuilder,
    private _instructorService: InstrutorService,
    private _toast: Toast
  ) { }

  ngOnInit(): void {
    this.instructorForm = this._formBuider.group(
      {
        cpf: ['', Validators.required],
        instrutor: ['']
      }
    )
  }

  selectInstructor(): void {
    this._dialogRef.close(this.instructorForm.get('instrutor').value);
  }

  find(): void {
    const payload = { cpf: this.instructorForm.get('cpf').value }
    this._instructorService.getAll(payload).subscribe(
      (res) => {
        this.instructorForm.get('instrutor').setValue(res[0])
        this.instructor = res[0];
      }
    )
  }

  newFind(): void {
    this.instructorForm.get('cpf').setValue('')
    this.instructorForm.get('instrutor').setValue(null)
  }

}
