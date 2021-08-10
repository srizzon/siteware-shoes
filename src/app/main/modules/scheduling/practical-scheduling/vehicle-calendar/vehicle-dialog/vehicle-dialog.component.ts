import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

import { MarcacaoExameDisponibilidadeCache } from '@models/gestao/marcacao-exame-disponibilidade-cache.model';
import { TableCustom } from '@models/outros/table-custom.model';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';

export interface VehicleDialogInterface {
  marcacao: MarcacaoExameDisponibilidadeCache
}
@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.scss']
})
export class VehicleDialogComponent implements OnInit {

  tabelaHorario: TableCustom;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<VehicleDialogComponent>,

  ) { }

  ngOnInit(): void {
    this.initTable();
  }

  initTable(): void {
    this.tabelaHorario = {
      columns: ['data', 'horario', 'instrutor', 'cfc', 'actions'],
      result: {
        noData: `Não existem agendamentos marcados para essa data.`,
        defaultMessage: `Realize uma busca para exibir os agendamentos existentes.`
      },
      columnData: {
        data: {
          header: 'DATA',
          type: TableColumnTypeEnum.STRING,
          element: 'date',
          pipe: TablePipesTypeEnum.DATE
        },
        horario: {
          header: 'HORÁRIO',
          type: TableColumnTypeEnum.STRING,
          element: 'time',
        },
        instrutor: {
          header: 'INSTRUTOR',
          type: TableColumnTypeEnum.STRING,
          element: 'instructorName',
        },
        cfc: {
          header: 'CFC',
          type: TableColumnTypeEnum.STRING,
          element: 'organizationName',
        },
        actions: {
          type: TableColumnTypeEnum.BUTTONS,
          buttonType: 'stroked',
          header: 'AÇÕES',
          buttons: [
            {
              icon: 'check',
              label: 'SELECIONAR',
              onClick: (data) => this.selecionarData(data),
              disabled: (data) => this.check(data),
            }
          ],
        },
      },
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }

  selecionarData(data): void {
    this.dialogRef.close(data);
  }

  check(data): void {
    return data.bloqueado;
  }
}
