import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { ConstantModel } from '@core/models/outros/constant.model';
import { EnrollmentCreditService } from '@services/apis/financeiro/enrollment-credit.service';
import { FilterPaginationModel } from '@core/models/outros/filter-pagination.model';
import { FilterService } from '@services/outros/filter.service';
import { FilterTypeEnum } from '@enums/filter-type.enum';
import { FilterModel } from '@models/outros/filter.model';
import { TableColumnTypeEnum } from '@core/enums/table-column-type.enum';
import { TableCustom } from '@models/outros/table-custom.model';
import { TablePipesTypeEnum } from '@core/enums/table-pipes-types.enum';
import { TableService } from '@components/tables/table-service';


@Component({
  selector: 'app-enrollment-credit-page',
  templateUrl: './enrollment-credit-page.component.html',
  styleUrls: ['./enrollment-credit-page.component.scss']
})
export class EnrollmentCreditPageComponent implements OnInit, OnDestroy {

  table: TableCustom;

  private _filter: FilterPaginationModel = {
    pageNumber: 0,
    pageSize: 5
  };
  private _filterBackup: FilterPaginationModel = {
    pageNumber: 0,
    pageSize: 5,
  }
  creditTypes: Array<ConstantModel> = new Array<ConstantModel>();

  private _subscription: Subscription;

  constructor(
    private _filterService: FilterService,
    private _tableService: TableService,
    private _enrollmentCreditService: EnrollmentCreditService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._filterService.resetFilter();
    this._getCreditTypes();
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

  private _getCreditTypes(): void {
    this.creditTypes = this._activatedRoute.snapshot.data['creditTypes'];
  }

  private _createFilter(): void {
    let filter: FilterModel[] =
      [
        {
          filterType: FilterTypeEnum.TEXT,
          param: 'matriculaId',
          label: 'Matrícula',
        },
        {
          filterType: FilterTypeEnum.SELECT,
          param: 'tipoCreditoId',
          label: 'Tipo Crédito',
          selectData: this.creditTypes
        }
      ];
    this._filterService.setFilters(filter)
  }

  private _createTable(): void {
    this.table = {
      columns: ['active', 'tipoCreditoDescricao', 'matriculaId', 'quantidade', 'usuarioCadastro', 'dataCadastro'],
      result: {
        noData: `Não existem créditos de matrículas cadastrados para a pesquisa informada.`,
        defaultMessage: `Não foi possível realizar a listagem dos créditos de matrículas.`,
      },
      width: '100%',
      data: [],
      columnData: {
        active: {
          type: TableColumnTypeEnum.STRING,
          element: 'active',
          header: 'ATIVO',
          pipe: TablePipesTypeEnum.TRUE_FALSE
        },
        tipoCreditoDescricao: {
          type: TableColumnTypeEnum.OBJECT,
          element: 'tipoCredito.descricao',
          header: 'TIPO CRÉDITO',
        },
        matriculaId: {
          type: TableColumnTypeEnum.STRING,
          element: 'matriculaId',
          header: 'MATRÍCULA',
        },
        quantidade: {
          type: TableColumnTypeEnum.STRING,
          element: 'quantidade',
          header: 'QUANTIDADE'
        },
        usuarioCadastro: {
          type: TableColumnTypeEnum.STRING,
          element: 'usuarioCadastro',
          header: 'USUÁRIO CADASTRO',
        },
        dataCadastro: {
          type: TableColumnTypeEnum.STRING,
          element: 'dataCadastro',
          header: 'DATA CADASTRO',
          pipe: TablePipesTypeEnum.DATE
        }
      },
    };
    this._tableService.setTableCustom(this.table);
  }

  private _countPage(): void {
    let filter = Object.assign({}, this._filterService.formatFilterToNormalUser(this._filter, 'cfcCnpj'));
    delete filter.pageNumber;
    filter.pageSize = 1;
    const endpoint = this._enrollmentCreditService.pageCount(filter);
    this._tableService.setEndPointPageCount(endpoint);
  }

  private _getData(): void {
    let filter = this._filterService.formatFilterToNormalUser(this._filter, 'cfcCnpj');
    filter.pageNumber++;
    const endpoint = this._enrollmentCreditService.getAll(filter);
    this._tableService.setEndPointData(endpoint);
  }
}
