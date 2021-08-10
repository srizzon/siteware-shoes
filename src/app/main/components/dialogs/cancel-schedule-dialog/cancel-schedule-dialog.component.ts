import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

import { AgendamentoModel } from '@models/agendamento/agendamento.model';
export interface CancelScheduleDialogInterface {
  tipo: string;
  schedule: AgendamentoModel;
}
@Component({
  templateUrl: './cancel-schedule-dialog.component.html',
  styleUrls: ['./cancel-schedule-dialog.component.scss']
})
export class CancelScheduleDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CancelScheduleDialogInterface,
  ) { }

  ngOnInit(): void { }
}
