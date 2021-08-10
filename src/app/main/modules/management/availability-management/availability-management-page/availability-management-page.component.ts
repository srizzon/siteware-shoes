import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CLASS_SITUATION_EXAM } from '@constants/class-situation-exam.constants';
import { ConstantModel } from '@core/models/outros/constant.model';
import { FilterModel } from '@core/models/outros/filter.model';
import { FilterPaginationModel } from '@core/models/outros/filter-pagination.model';
import { FilterService } from '@core/services/outros/filter.service';
import { FilterTypeEnum } from '@core/enums/filter-type.enum';
import { MarcacaoExameDisponibilidadeService } from '@core/services/apis/gestao/marcacao-exame-disponibilidade.service';
import { MatPaginator } from '@angular/material/paginator';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { ServicesSubject } from '@core/services/outros/services-subjects.service';
import { TableColumnTypeEnum } from '@core/enums/table-column-type.enum';
import { TableCustom } from '@core/models/outros/table-custom.model';
import { TablePipesTypeEnum } from '@core/enums/table-pipes-types.enum';
import { TableService } from '@components/tables/table-service';

@Component({
  selector: 'app-availability-management-page',
  templateUrl: './availability-management-page.component.html',
  styleUrls: ['./availability-management-page.component.scss']
})
export class AvailabilityManagementPageComponent implements OnInit {

  tiposExames: ConstantModel[] = new Array<ConstantModel>();
  locaisExames: ConstantModel[] = new Array<ConstantModel>();

  private _filter: FilterPaginationModel = {
    pageNumber: 0,
    pageSize: 5
  };

  private _filterBackup: FilterPaginationModel = {
    pageNumber: 0,
    pageSize: 5,
  };

  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _filterService: FilterService,
    private _router: Router,
    private _tableService: TableService,
    private _service: MarcacaoExameDisponibilidadeService,
    private _serviceSubject: ServicesSubject,
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._filterService.resetFilter();
    this._loadLocalAndExames();
    this._createFilter();
    this._applyFilter();
    this._countPage();
    this._createTable();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  changePaginator(paginator: MatPaginator) {
    this._filter.pageNumber = paginator.pageIndex;
    this._filter.pageSize = paginator.pageSize;
    if (!this._tableService.loading) {
      this._getData();
    }
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

  private _createFilter(): void {
    let filter: FilterModel[] =
      [
        {
          filterType: FilterTypeEnum.LOCAL_EXAME,
          param: 'idLocal',
          label: 'LOCAL DO EXAME',
          selectData: this.locaisExames
        },
        {
          filterType: FilterTypeEnum.SELECT,
          param: 'idExame',
          label: 'TIPO DE EXAME',
          selectData: this.tiposExames
        },
        {
          filterType: FilterTypeEnum.SELECT,
          param: 'situacao',
          label: 'SITUAÇÃO',
          selectData: CLASS_SITUATION_EXAM
        },
      ];
    this._filterService.setFilters(filter)
  }

  add() {
    this._router.navigate([ROUTES_APLICATION.add], { relativeTo: this._activatedRoute });
  }

  edit(availability) {
    this._router.navigate([ROUTES_APLICATION.detail, availability.id], { relativeTo: this._activatedRoute });
  }

  private _countPage(): void {
    let filter = Object.assign({}, this._filterService.formatFilterToNormalUser(this._filter, 'cfcCnpj'));
    delete filter.pageNumber;
    filter.pageSize = 1;
    const endpoint = this._service.pageCount(filter);
    this._tableService.setEndPointPageCount(endpoint);
  }

  private _getData(): void {
    let filter = this._filterService.formatFilterToNormalUser(this._filter, 'cfcCnpj');
    filter.pageNumber++;
    const endpoint = this._service.getAll(filter);
    this._tableService.setEndPointData(endpoint);
  }

  private _createTable(): void {
    const table: TableCustom = {
      columns: ['local', 'exame', 'horario', 'quantidadeVagas', 'status', 'ativo', 'actions'],
      result: {
        noData: `Não existem planos de aulas para a pesquisa informada.`,
        defaultMessage: `Não foi possível realizar a listagem dos planos de aulas.`,
      },
      width: '100%',
      data: [],
      columnData: {
        ativo: {
          type: TableColumnTypeEnum.STRING,
          element: 'ativo',
          header: 'ATIVO',
          pipe: TablePipesTypeEnum.TRUE_FALSE
        },
        status: {
          type: TableColumnTypeEnum.STRING,
          element: 'status',
          header: 'SITUAÇÃO',
        },
        horario: {
          type: TableColumnTypeEnum.STRING,
          element: 'horario',
          header: 'HORÁRIO'
        },
        exame: {
          type: TableColumnTypeEnum.OBJECT,
          element: 'exame.descricao',
          header: 'EXAME',
        },
        local: {
          type: TableColumnTypeEnum.OBJECT,
          element: 'local.descricao',
          header: 'LOCAL',
        },
        quantidadeVagas: {
          type: TableColumnTypeEnum.STRING,
          element: 'quantidadeVagas',
          header: 'QUANTIDADE VAGAS',
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
    this._tableService.setTableCustom(table);
  }

  private _loadLocalAndExames(): void {
    this._subscription.add(
      this._serviceSubject.getLocal().subscribe(res => {
        this.locaisExames = res
      })
    )
    this._subscription.add(
      this._serviceSubject.getTipoExame().subscribe(res => {
        this.tiposExames = res
      })
    )
  }
}
