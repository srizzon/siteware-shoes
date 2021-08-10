import { TableCustom } from '@models/outros/table-custom.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { MarcacaoExameDisponibilidade } from '@core/models/gestao/marcacao-exame-disponibilidade.model';

@Component({
  selector: 'app-availability-blocking-management-places',
  templateUrl: './availability-blocking-management-places.component.html',
  styleUrls: ['./availability-blocking-management-places.component.scss']
})
export class AvailabilityBlockingManagementPlacesComponent implements OnInit {

  tabelaDisponibilidade: TableCustom;
  disponibilidades: MarcacaoExameDisponibilidade[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AvailabilityBlockingManagementPlacesComponent>
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.initTable();
  }

  initTable() {
    this.tabelaDisponibilidade = {
      columns: ['id', 'local', 'exame', 'horario', 'actions'],
      result: {
        noData: `Não existem agendamentos marcados para essa data.`,
        defaultMessage: `Realize uma busca para exibir os agendamentos existentes.`
      },
      columnData: {
        id: {
          header: 'ID',
          type: TableColumnTypeEnum.OBJECT,
          element: 'id'
        },
        local: {
          header: 'LOCAL',
          type: TableColumnTypeEnum.OBJECT,
          element: 'local.descricao'
        },
        exame: {
          header: 'EXAME',
          type: TableColumnTypeEnum.OBJECT,
          element: 'exame.descricao',
        },
        horario: {
          header: 'HORÁRIO',
          type: TableColumnTypeEnum.STRING,
          element: 'horario',
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
            }
          ],
        },
      }
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  selecionarData(data) {
    this.dialogRef.close(data);
  }

  check(data) {
    return data.bloqueado;
  }
}
