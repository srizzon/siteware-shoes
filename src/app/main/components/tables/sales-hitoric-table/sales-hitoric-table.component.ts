import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

import { ContratoFinanceiroModel } from '@models/financeiro/contrato-financeiro.model';
import { TableCustom } from '@models/outros/table-custom.model';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';

export interface SalesHistoricInterface {
  contrato: ContratoFinanceiroModel;
  candidate: string
}

@Component({
  selector: 'app-sales-hitoric-table',
  templateUrl: './sales-hitoric-table.component.html',
  styleUrls: ['./sales-hitoric-table.component.scss']
})
export class SalesHitoricTableComponent implements OnInit {

  tableData: TableCustom;

  constructor(

    @Inject(MAT_DIALOG_DATA) public data: SalesHistoricInterface) { }

  ngOnInit(): void {
    this.createTable(this.data);
  }

  createTable(rows) {
    this.tableData = {
      columns: [
        'valor',
        'dataVencimento',
        'dataPagamento',
      ],
      title: 'Histórico de Movimentação',
      subTitle: null,
      width: '100%',
      result: {
        noData: `Não existem dados para exibir.`,
        defaultMessage: `Não existem dados para exibir.`
      },
      columnData: {
        valor: {
          type: TableColumnTypeEnum.STRING,
          element: 'valor',
          header: 'VALOR',
          pipe: TablePipesTypeEnum.CURRENCY
        },
        dataVencimento: {
          type: TableColumnTypeEnum.STRING,
          element: 'dataVencimento',
          header: 'DATA DE VENCIMENTO',
          pipe: TablePipesTypeEnum.DATE
        },
        dataPagamento: {
          type: TableColumnTypeEnum.STRING,
          element: 'dataPagamento',
          header: 'DATA DE PAGAMENTO',
          pipe: TablePipesTypeEnum.DATE
        },
      },
      data: rows.contrato.lancamentosFinanceiros
    };
  }
}
