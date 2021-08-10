import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { FilterModel } from '@models/outros/filter.model';
import { FilterPaginationModel } from '@models/outros/filter-pagination.model';
import { FilterService } from '@services/outros/filter.service';
import { FilterTypeEnum } from '@enums/filter-type.enum';
import { LocalModel } from '@core/models/gestao/local.model';
import { LocalService } from '@services/apis/gestao/local.service';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TableCustom } from '@models/outros/table-custom.model';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';
import { TableService } from '@components/tables/table-service';

@Component({
  selector: 'app-local-page',
  templateUrl: './local-page.component.html',
  styleUrls: ['./local-page.component.scss']
})
export class LocalPageComponent implements OnInit {

  locals: LocalModel[];
  tableData: TableCustom;
  private _filter: FilterPaginationModel = {
    pageNumber: 0,
    pageSize: 5,
  };
  private _filterBackup: FilterPaginationModel = {
    pageNumber: 0,
    pageSize: 5,
  }
  private _subscription: Subscription;


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _localService: LocalService,
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

  add(): void {
    this._router.navigate([`${ROUTES_APLICATION.add}`], { relativeTo: this._activatedRoute });
  }

  changePaginator(paginator: MatPaginator) {
    this._filter.pageNumber = paginator.pageIndex;
    this._filter.pageSize = paginator.pageSize;
    if (!this._tableService.loading) {
      this._getData();
    }
  }

  info(local: LocalModel): void {
    this._router.navigate([`${ROUTES_APLICATION.detail}`, local.id], { relativeTo: this._activatedRoute });
  }

  showFilter() {
    this._filterService.changeDisplay();
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

  private _countPage(): void {
    let filter = Object.assign({}, this._filterService.formatFilterToNormalUser(this._filter, 'cfcCnpj'));
    delete filter.pageNumber;
    filter.pageSize = 1;
    const endpoint = this._localService.pageCount(filter);
    this._tableService.setEndPointPageCount(endpoint);
  }

  private _createFilter(): void {
    let filter: FilterModel[] =
      [
        {
          filterType: FilterTypeEnum.TEXT,
          param: 'idUnidadeDetran',
          label: 'ID UNIDADE DETRAN'
        },
        {
          filterType: FilterTypeEnum.TEXT,
          param: 'codLocalDetran',
          label: 'COD. LOCAL DETRAN',
        },
      ];
    this._filterService.setFilters(filter)
  }

  private _createTable(): void {
    const table: TableCustom = {
      columns: [
        'codigoLocalDetran',
        'idUnidadeDetran',
        'descricao',
        'ativo',
        'actions',
      ],
      pageSize: 5,
      title: 'Tabela de Matriculas',
      result: {
        noData: `Não existem números de matriculas cadastrados para a pesquisa informada.`,
        defaultMessage: `Realize uma busca para exibir os números de matriculas existentes.`,
      },
      width: '99%',
      data: [],
      columnData: {
        codigoLocalDetran: {
          header: 'CÓDIGO LOCAL DETRAN',
          type: TableColumnTypeEnum.STRING,
          element: 'codigoLocalDetran',
        },
        idUnidadeDetran: {
          header: 'ID UNIDADE DETRAN',
          type: TableColumnTypeEnum.STRING,
          element: 'idUnidadeDetran',
        },
        descricao: {
          header: 'DESCRIÇÃO',
          type: TableColumnTypeEnum.STRING,
          element: 'descricao',
        },
        ativo: {
          header: 'ATIVO',
          type: TableColumnTypeEnum.STRING,
          element: 'ativo',
          pipe: TablePipesTypeEnum.TRUE_FALSE
        },
        actions: {
          header: 'AÇÕES',
          buttonType: 'stroked',
          type: TableColumnTypeEnum.BUTTONS,
          buttons: [
            {
              icon: 'info',
              label: 'DETALHES',
              onClick: (data) => this.info(data)
            },
          ],
        },
      },
    };
    this._tableService.setTableCustom(table);
  }

  private _getData(): void {
    let filter = this._filterService.formatFilterToNormalUser(this._filter, 'cfcCnpj');
    filter.pageNumber++;
    const endpoint = this._localService.getAll(filter);
    this._tableService.setEndPointData(endpoint);
  }

}
