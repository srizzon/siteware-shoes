import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AlertaModel } from '@core/models/monitoramento/alerta.model';
import { AulaMonitoramentoModel } from '@models/monitoramento/aula-monitoramento.model';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TableCustom } from '@models/outros/table-custom.model';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';

export class AlertDialogInterface {
  alerts: AlertaModel[];
  class: AulaMonitoramentoModel;
}

@Component({
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {

  tableAlerts: TableCustom;

  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertDialogInterface) {}

  ngOnInit(): void {
    this._initTable();
  }

  private _initTable(): void {
    this.tableAlerts = {
      columns: ['tipoAlerta', 'dataCadastro', 'descricao'],
      result: {
        noData: `Não existem planos de aulas para a pesquisa informada.`,
        defaultMessage: `Não foi possível realizar a listagem dos planos de aulas.`,
      },
      width: '100%',
      displayFilter: false,
      data: this.data.alerts,
      columnData: {
        tipoAlerta: {
          type: TableColumnTypeEnum.STRING,
          element: 'tipoAlerta',
          header: 'TIPO',
        },
        dataCadastro: {
          type: TableColumnTypeEnum.STRING,
          element: 'dataCadastro',
          header: 'HORA',
          pipe: TablePipesTypeEnum.TIME_TO_FRONT
        },
        descricao: {
          type: TableColumnTypeEnum.STRING,
          element: 'descricao',
          header: 'DESCRIÇÃO',
        },
      },
    };
  }
}
