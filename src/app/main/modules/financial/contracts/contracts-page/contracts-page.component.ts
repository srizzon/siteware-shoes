import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CLASS_SITUATION_CONTRACT } from '@constants/class-situation-contract.constants';
import { ContratoFinanceiroService } from '@core/services/apis/financeiro/contrato-financeiro.service';
import { ContratoFinanceiroModel } from '@core/models/financeiro/contrato-financeiro.model';
import { FilterPaginationModel } from '@core/models/outros/filter-pagination.model';
import { FilterService } from '@core/services/outros/filter.service';
import { FilterModel } from '@core/models/outros/filter.model';
import { FilterTypeEnum } from '@core/enums/filter-type.enum';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TableCustom } from '@models/outros/table-custom.model';
import { TableService } from '@components/tables/table-service';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';

@Component({
  selector: 'app-contracts-page',
  templateUrl: './contracts-page.component.html',
  styleUrls: ['./contracts-page.component.scss']
})
export class ContractsPageComponent implements OnInit {

  table: TableCustom;

  private _filter: FilterPaginationModel = {
    pageNumber: 0,
    pageSize: 5
  };
  private _filterBackup: FilterPaginationModel = {
    pageNumber: 0,
    pageSize: 5,
  }
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _contratoFinanceiroService: ContratoFinanceiroService,
    private _router: Router,
    private _tableService: TableService,
    private _filterService: FilterService,
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._filterService.resetFilter();
    this._createFilter();
    this._applyFilter();
    this._countPage();
    this._createTable();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  changePaginator(paginator: MatPaginator): void {
    this._filter.pageNumber = paginator.pageIndex;
    this._filter.pageSize = paginator.pageSize;
    if (!this._tableService.loading) {
      this._getData();
    }
  }

  private _createFilter(): void {
    let filter: FilterModel[] =
      [
        {
          filterType: FilterTypeEnum.SELECT,
          param: 'cfc',
          label: 'CFC',
          selectData: []
        },
        {
          filterType: FilterTypeEnum.SELECT,
          param: 'SituacaoContrato',
          label: 'SITUAÇÃO',
          selectData: CLASS_SITUATION_CONTRACT
        },
      ];
    this._filterService.setFilters(filter)
  }

  private _applyFilter(): void {
    this._subscription.add(
      this._filterService
        .getResults()
        .subscribe(
          (res) => {
            if (res && (Object.keys(res).length > 0)) {
              this._filter = Object.assign({}, this._filterBackup, res);
              this._countPage();
              this._getData();
            } else if (res && (Object.keys(res).length == 0)) {
              this._filter = Object.assign({}, this._filterBackup);
              this._countPage();
              this._getData();
            }
          },
          () => this._tableService.setData([]),
        )
    )
  }

  showFilter(): void {
    this._filterService.changeDisplay();
  }

  edit(contrato: ContratoFinanceiroModel): void {
    this._router.navigate([`${ROUTES_APLICATION.detail}`, contrato.id], { relativeTo: this._activatedRoute })
  }

  private _createTable(): void {
    this.table = {
      columns: ['entidadeDocumento', 'dataInicio', 'dataEncerramento', 'valorLiquido', 'valorParcelas', 'parcelas', 'situacaoContrato', 'actions'],
      result: {
        noData: `Não existem contratos cadastrados para a pesquisa informada.`,
        defaultMessage: `Não foi possível realizar a listagem dos contratos.`,
      },
      width: '100%',
      data: [],
      columnData: {
        entidadeDocumento: {
          header: 'DOCUMENTO',
          type: TableColumnTypeEnum.STRING,
          element: 'entidadeDocumento',
        },
        dataInicio: {
          header: 'DATA ÍNICIO',
          type: TableColumnTypeEnum.STRING,
          element: 'dataInicio',
          pipe: TablePipesTypeEnum.DATE
        },
        dataEncerramento: {
          header: 'DATA ENCERRAMENTO',
          type: TableColumnTypeEnum.STRING,
          element: 'dataEncerramento',
          pipe: TablePipesTypeEnum.DATE
        },
        valorLiquido: {
          header: 'VALOR TOTAL',
          type: TableColumnTypeEnum.STRING,
          element: 'valorLiquido',
          pipe: TablePipesTypeEnum.CURRENCY
        },
        valorParcelas: {
          header: 'VALOR PARCELA',
          type: TableColumnTypeEnum.STRING,
          element: 'valorParcelas',
          pipe: TablePipesTypeEnum.CURRENCY
        },
        parcelas: {
          header: 'NÚMERO PARCELAS',
          type: TableColumnTypeEnum.STRING,
          element: 'parcelas',
        },
        situacaoContrato: {
          header: 'SITUAÇÃO',
          type: TableColumnTypeEnum.STRING,
          element: 'situacaoContrato',
          pipe: TablePipesTypeEnum.SITUATION_PAYMENT
        },
        actions: {
          type: TableColumnTypeEnum.BUTTONS,
          buttonType: 'stroked',
          header: 'AÇÕES',
          buttons: [
            {
              icon: 'info',
              label: 'VISUALIZAR',
              onClick: (data) => this.edit(data),
            }
          ],
        },
      },
    };
    this._tableService.setTableCustom(this.table);
  }

  private _countPage(): void {
    let filter = Object.assign({}, this._filterService.formatFilterToNormalUser(this._filter, 'cfcCnpj'));
    delete filter.pageNumber;
    filter.pageSize = 1;
    const endpoint = this._contratoFinanceiroService.pageCount(filter);
    this._tableService.setEndPointPageCount(endpoint);
  }

  private _getData(): void {
    let filter = this._filterService.formatFilterToNormalUser(this._filter, 'cfcCnpj');
    filter.pageNumber++;
    const endpoint = this._contratoFinanceiroService.getAll(filter);
    this._tableService.setEndPointData(endpoint);
  }
}
