import { TableCustom } from '@models/outros/table-custom.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

import { MarcacaoExameDisponibilidadeCache } from '@models/gestao/marcacao-exame-disponibilidade-cache.model';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';

export interface PlacesDialogInterface {
  marcacao: MarcacaoExameDisponibilidadeCache
}
@Component({
  selector: 'app-places-dialog',
  templateUrl: './places-dialog.component.html',
  styleUrls: ['./places-dialog.component.scss']
})
export class PlacesDialogComponent implements OnInit {

  tabelaHorario: TableCustom;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PlacesDialogInterface,
    private dialogRef: MatDialogRef<PlacesDialogComponent>,

  ) { }

  ngOnInit(): void {
    this.initTable();
  }

  initTable() {
    this.tabelaHorario = {
      columns: ['data', 'horario', 'quantidadeVagasOfertadas', 'quantidadeVagasAgendadas', 'quantidadeVagasDisponiveis', 'bloqueio', 'bloqueadoDescricao',  'actions'],
      result: {
        noData: `Não existem agendamentos marcados para essa data.`,
        defaultMessage: `Realize uma busca para exibir os agendamentos existentes.`
      },
      columnData: {
        data: {
          header: 'DATA',
          type: TableColumnTypeEnum.STRING,
          element: 'data',
          pipe: TablePipesTypeEnum.DATE
        },
        horario: {
          header: 'HORÁRIO',
          type: TableColumnTypeEnum.STRING,
          element: 'hora',
        },
        quantidadeVagasAgendadas: {
          header: 'VAGAS AGENDADAS',
          type: TableColumnTypeEnum.STRING,
          element: 'quantidadeVagasAgendadas',
        },
        quantidadeVagasDisponiveis: {
          header: 'VAGAS RESTANTES',
          type: TableColumnTypeEnum.STRING,
          element: 'quantidadeVagasDisponiveis',
        },
        quantidadeVagasOfertadas: {
          header: 'VAGAS OFERTADAS',
          type: TableColumnTypeEnum.STRING,
          element: 'quantidadeVagasOfertadas',
        },
        bloqueio: {
          header: 'BLOQUEIO',
          type: TableColumnTypeEnum.STRING,
          element: 'bloqueado',
          pipe: TablePipesTypeEnum.TRUE_FALSE
        },
        bloqueadoDescricao: {
          header: 'DESCRIÇÃO BLOQUEIO',
          type: TableColumnTypeEnum.STRING,
          element: 'bloqueadoDescricao',
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
