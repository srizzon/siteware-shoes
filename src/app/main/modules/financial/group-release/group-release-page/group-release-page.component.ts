import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { GrupoLancamentoService } from '@core/services/apis/financeiro/grupo-lancamento.service';
import { FilterModel } from '@core/models/outros/filter.model';
import { FilterPaginationModel } from '@core/models/outros/filter-pagination.model';
import { FilterService } from '@core/services/outros/filter.service';
import { FilterTypeEnum } from '@core/enums/filter-type.enum';
import { FormControl } from '@angular/forms';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TableCustom } from '@models/outros/table-custom.model';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';
import { TableService } from '@components/tables/table-service';

@Component({
  selector: 'app-group-release-page',
  templateUrl: './group-release-page.component.html',
  styleUrls: ['./group-release-page.component.scss']
})
export class GroupReleasePageComponent implements OnInit, OnDestroy {

  inputName: FormControl = new FormControl();
  filteredOptions: any;
  tableGroupRelease: TableCustom;

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
    private _filterService: FilterService,
    private _router: Router,
    private _tableService: TableService,
    private _grupoLancamentoService: GrupoLancamentoService,
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
    this._subscription.unsubscribe()
  }

  private _createFilter(): void {
    let filter: FilterModel[] =
      [
        {
          filterType: FilterTypeEnum.CHECKBOX,
          param: 'sindauto',
          label: 'Sindauto',
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

  changePaginator(paginator: MatPaginator): void {
    this._filter.pageNumber = paginator.pageIndex;
    this._filter.pageSize = paginator.pageSize;
    if (!this._tableService.loading) {
      this._getData();
    }
  }

  add(): void {
    this._router.navigate([`${ROUTES_APLICATION.add}`], { relativeTo: this._activatedRoute })
  }

  view(group): void {
    this._router.navigate([`${ROUTES_APLICATION.detail}`, group.id], { relativeTo: this._activatedRoute })
  }

  private _createTable(): void {
    this.tableGroupRelease = {
      columns: ['descricao', 'usuarioCadastro', 'dataCadastro', 'actions'],
      title: 'Tabela de Grupos',
      result: {
        noData: `Não existem grupos de lançamentos cadastrados para a pesquisa informada.`,
        defaultMessage: `Realize uma busca para exibir os grupos de lançamentos existentes.`,
      },
      data: [],
      columnData: {
        descricao: {
          header: 'Descrição',
          type: TableColumnTypeEnum.STRING,
          element: 'descricao',
        },
        usuarioCadastro: {
          header: 'Usuário de Cadastro',
          type: TableColumnTypeEnum.STRING,
          element: 'usuarioCadastro',
        },
        dataCadastro: {
          header: 'Data de Cadastro',
          type: TableColumnTypeEnum.STRING,
          pipe: TablePipesTypeEnum.DATE_AND_TIME,
          element: 'dataCadastro',
        },
        actions: {
          type: TableColumnTypeEnum.BUTTONS,
          buttonType: 'stroked',
          header: 'AÇÕES',
          buttons: [
            {
              icon: 'info',
              label: 'VISUALIZAR',
              onClick: (data) => this.view(data),
            },
          ],
        },
      },
    };

    this._tableService.setTableCustom(this.tableGroupRelease);
  }

  private _countPage(): void {
    let filter = Object.assign({}, this._filterService.formatFilterToNormalUser(this._filter, 'cfcCnpj'));
    delete filter.pageNumber;
    filter.pageSize = 1;
    const endpoint = this._grupoLancamentoService.pageCount(filter);
    this._tableService.setEndPointPageCount(endpoint);
  }

  private _getData(): void {
    let filter = this._filterService.formatFilterToNormalUser(this._filter, 'cfcCnpj');
    filter.pageNumber++;
    const endpoint = this._grupoLancamentoService.getAll(filter);
    this._tableService.setEndPointData(endpoint);
  }
}
