import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';

import { AgendamentoModel } from '@models/agendamento/agendamento.model';
import { Helper } from '@utils/helper';
export interface RescheduleDialogInterface {
  tipo: string;
  schedule: AgendamentoModel
}
@Component({
  templateUrl: './reschedule-dialog.component.html',
  styleUrls: ['./reschedule-dialog.component.scss']
})
export class RescheduleDialogComponent implements OnInit {

  formReschedule: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RescheduleDialogInterface,
    private matDialog: MatDialogRef<RescheduleDialogInterface>,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formReschedule = this._formBuilder.group({
      date: ['', [Validators.required]],
    })
  }

  reschedule() {
    const values = this.formReschedule.getRawValue();
    const inicio = moment(this.data.schedule.agenda).format('HH:mm');
    const fim = moment(this.data.schedule.agendaFim).format('HH:mm');

    const reschedule = {
      agenda: Helper.formatDateUtc(values.date, inicio),
      agendaFim: Helper.formatDateUtc(values.date, fim),
      id: this.data.schedule.id
    }
    this.matDialog.close(reschedule)
  }
}
