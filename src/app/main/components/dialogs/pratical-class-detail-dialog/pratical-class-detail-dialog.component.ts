import { AulaMonitoramentoModel } from '@core/models/monitoramento/aula-monitoramento.model';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './pratical-class-detail-dialog.component.html',
  styleUrls: ['./pratical-class-detail-dialog.component.scss']
})
export class PraticalClassDetailDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: AulaMonitoramentoModel) { }
}
