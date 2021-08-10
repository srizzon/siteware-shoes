import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { ConstantModel } from '@core/models/outros/constant.model';
import { FilterModel } from '@core/models/outros/filter.model';
import { FilterPaginationModel } from '@core/models/outros/filter-pagination.model';
import { FilterTypeEnum } from '@core/enums/filter-type.enum';
import { FilterService } from '@core/services/outros/filter.service';
import { TableColumnTypeEnum } from '@core/enums/table-column-type.enum';
import { TableCustom } from '@core/models/outros/table-custom.model';
import { TablePipesTypeEnum } from '@core/enums/table-pipes-types.enum';
import { TableService } from '@components/tables/table-service';
import { TipoDeLancamentoService } from '@services/apis/financeiro/tipo-de-lancamento.service';
import { TipoDeLancamentoModel } from '@core/models/financeiro/tipo-de-lancamento.model';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';

@Component({
  selector: 'app-release-group-types-page',
  templateUrl: './release-group-types-page.component.html',
  styleUrls: ['./release-group-types-page.component.scss']
})
export class ReleaseGroupTypesPageComponent implements OnInit {

  inputName: FormControl = new FormControl();
  filteredOptions: any;
  table: TableCustom;
  groups: ConstantModel[] = new Array<ConstantModel>();

  types: ConstantModel[] = [
    { id: 'CB', descricao: 'Crédito' },
    { id: 'DB', descricao: 'Débito' },
  ];

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
    private _tipoDeLancamentoService: TipoDeLancamentoService,
    private _activatedRoute: ActivatedRoute,
    private _filterService: FilterService,
    private _router: Router,
    private _tableService: TableService,
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._filterService.resetFilter();
    this._loadGroups();
    this._createFilter();
    this._applyFilter();
    this._countPage();
    this._createTable();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  add(): void {
    this._router.navigate([`${ROUTES_APLICATION.add}`], { relativeTo: this._activatedRoute })
  }

  edit(tipoDeLancamento: TipoDeLancamentoModel): void {
    this._router.navigate([`${ROUTES_APLICATION.detail}`, tipoDeLancamento.id], { relativeTo: this._activatedRoute })
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
          param: 'grupoLancamentoId',
          label: 'GRUPO LANÇAMENTO',
          selectData: this.groups
        },
        {
          filterType: FilterTypeEnum.SELECT,
          param: 'tiposLancamentos',
          label: 'Tipo Lançamento',
          selectData: this.types
        },
      ];
    this._filterService.setFilters(filter)
  }

  showFilter(): void {
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

  private _createTable(): void {
    this.table = {
      columns: ['descricao', 'tipo', 'grupoLancamento', 'valorPadrao', 'actions'],
      result: {
        noData: `Não existem tipos de lançamentos cadastrados para a pesquisa informada.`,
        defaultMessage: `Não foi possível realizar a listagem dos tipos de lançamentos.`,
      },
      width: '100%',
      data: [],
      columnData: {
        descricao: {
          type: TableColumnTypeEnum.STRING,
          element: 'descricao',
          header: 'DESCRIÇÃO'
        },
        tipo: {
          type: TableColumnTypeEnum.STRING,
          element: 'tipo',
          header: 'TIPO',
          pipe: TablePipesTypeEnum.TYPE_RELEASE
        },
        grupoLancamento: {
          type: TableColumnTypeEnum.OBJECT,
          element: 'grupoLancamento.descricao',
          header: 'GRUPO DE LANÇAMENTO',
        },
        valorPadrao: {
          type: TableColumnTypeEnum.STRING,
          element: 'valorPadrao',
          header: 'VALOR (R$)',
          pipe: TablePipesTypeEnum.CURRENCY
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
    const endpoint = this._tipoDeLancamentoService.pageCount(filter);
    this._tableService.setEndPointPageCount(endpoint);
  }

  private _getData(): void {
    let filter = this._filterService.formatFilterToNormalUser(this._filter, 'cfcCnpj');
    filter.pageNumber++;
    const endpoint = this._tipoDeLancamentoService.getAll(filter);
    this._tableService.setEndPointData(endpoint);
  }

  private _loadGroups(): void {
    this.groups = this._activatedRoute.snapshot.data['groupRelease'].map(item => ({ id: item.id, descricao: item.descricao }));
  }

}
