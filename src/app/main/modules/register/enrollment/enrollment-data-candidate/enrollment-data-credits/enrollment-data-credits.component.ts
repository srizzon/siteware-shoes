import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { Credito } from '@models/gestao/credito.model';
import { TableCustom } from '@models/outros/table-custom.model';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';

@Component({
  selector: 'app-enrollment-data-credits',
  templateUrl: './enrollment-data-credits.component.html',
  styleUrls: ['./enrollment-data-credits.component.scss']
})
export class EnrollmentDataCreditsComponent implements OnInit, OnChanges {

  @Input() creditos: Credito[];
  tableData: TableCustom;

  constructor( ) { }

  ngOnInit(): void {
    this._createTable([]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.creditos.currentValue) {
      this._createTable(changes.creditos.currentValue);
    }
  }

  private _createTable(credito: Credito[]): void {
    this.tableData = {
      columns: [
        'produto',
        'utilizados',
        'disponiveis',
      ],
      title: 'Créditos Disponíveis',
      subTitle: 'Listagem de créditos disponíveis por produto',
      width: '82%',
      data: credito,
      result: {
        noData: 'Não foi registrado créditos para o candidato.',
        defaultMessage: 'Não existe dados para serem exibidos.'
      },
      columnData: {
        produto: {
          header: 'TIPO DE CRÉDITO',
          type: TableColumnTypeEnum.STRING,
          element: 'descricao'
        },
        utilizados: {
          header: 'UTILIZADOS',
          type: TableColumnTypeEnum.STRING,
          element: 'utilizados'
        },
        disponiveis: {
          header: 'DISPONÍVEIS',
          type: TableColumnTypeEnum.STRING,
          element: 'quantidade'
        },
      }
    }
  }
}
