import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { DefaultMasks } from '@enums/default-masks.enum';
import { FilterModel } from '@models/outros/filter.model';
import { FilterPaginationModel } from '@models/outros/filter-pagination.model';
import { FilterService } from '@services/outros/filter.service';
import { FilterTypeEnum } from '@enums/filter-type.enum';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { SchedulePracticalsModel } from '@models/agendamento-pratico/schedule-practicals.model';
import { SchedulePracticalsService } from '@services/apis/agendamento-pratico/schedule-practicals.service';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';
import { TableService } from '@components/tables/table-service';
import { TableCustom } from '@models/outros/table-custom.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-practical-scheduling-page',
  templateUrl: './practical-scheduling-page.component.html',
  styleUrls: ['./practical-scheduling-page.component.scss']
})
export class PracticalSchedulingPageComponent implements OnInit, OnDestroy {

  tableData: TableCustom;
  private _filter: FilterPaginationModel = {
    pageNumber: 0,
    pageSize: 5,
  };
  private _filterBackup: FilterPaginationModel = {
    pageNumber: 0,
    pageSize: 5,
  }
  table: TableCustom;
  schedulingData: SchedulePracticalsModel[] = new Array<SchedulePracticalsModel>();
  private _subscription: Subscription;


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _schedulePracticalsService: SchedulePracticalsService,
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

  info(schedule: SchedulePracticalsModel): void {
    this._router.navigate([`${ROUTES_APLICATION.detail}`, schedule.id], { relativeTo: this._activatedRoute })
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
    const endpoint = this._schedulePracticalsService.pageCount(filter);
    this._tableService.setEndPointPageCount(endpoint);
  }

  private _createFilter(): void {
    let filter: FilterModel[] =
      [
        {
          filterType: FilterTypeEnum.TEXT,
          param: 'nome',
          label: 'NOME'
        },
        {
          filterType: FilterTypeEnum.TEXT,
          param: 'cpf',
          label: 'CPF',
          mask: DefaultMasks.CPF
        },
        {
          filterType: FilterTypeEnum.TEXT,
          param: 'renach',
          label: 'RENACH'
        },
        {
          filterType: FilterTypeEnum.TEXT,
          param: 'cfccnpj',
          label: 'CNPJ CFC',
          mask: DefaultMasks.CNPJ
        },
      ];
    this._filterService.setFilters(filter)
  }

  private _createTable(): void {
    const tableEnrrolment: TableCustom = {
      columns: [
        'vehicle',
        'instructor',
        'studentEnrollment',
        'dateTime',
        'enabled',
        'actions'
      ],
      pageSize: 5,
      title: 'Tabela de Agendamentos Prático',
      result: {
        noData: `Não existem agendamentos cadastrados para a pesquisa informada.`,
        defaultMessage: `Realize uma busca para exibir os agendamentos.`,
      },
      width: '99%',
      data: [],
      columnData: {
        vehicle: {
          header: 'VEÍCULO',
          type: TableColumnTypeEnum.OBJECT,
          element: 'vehicle.licencePlate',
        },
        instructor: {
          header: 'INSTRUTOR',
          type: TableColumnTypeEnum.OBJECT,
          element: 'instructor.name',
        },
        studentEnrollment: {
          header: 'MATRÍCULA',
          type: TableColumnTypeEnum.OBJECT,
          element: 'idStudentEnrollment',
        },
        dateTime: {
          header: 'DATA',
          type: TableColumnTypeEnum.STRING,
          element: 'dateTime',
          pipe: TablePipesTypeEnum.DATE_AND_TIME
        },
        enabled: {
          header: 'ATIVO',
          type: TableColumnTypeEnum.STRING,
          element: 'enabled',
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
    this._tableService.setTableCustom(tableEnrrolment);
  }

  private _getData(): void {
    let filter = this._filterService.formatFilterToNormalUser(this._filter, 'cfcCnpj');
    filter.pageNumber++;
    const endpoint = this._schedulePracticalsService.getAll(filter);
    this._tableService.setEndPointData(endpoint);
  }
}
