import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { AgendamentoModel } from '@models/agendamento/agendamento.model';
import { AgendamentoService } from '@services/apis/agendamento/agendamento.service';
import { CancelScheduleDialogComponent, CancelScheduleDialogInterface } from '@components/dialogs/cancel-schedule-dialog/cancel-schedule-dialog.component';
import { CLASS_SITUATION } from '@constants/class-situation.constants';
import { DefaultMasks } from '@enums/default-masks.enum';
import { FilterModel } from '@models/outros/filter.model';
import { FilterPaginationModel } from '@models/outros/filter-pagination.model';
import { FilterService } from '@services/outros/filter.service';
import { FilterTypeEnum } from '@enums/filter-type.enum';
import { RescheduleDialogComponent, RescheduleDialogInterface } from '@components/dialogs/reschedule-dialog/reschedule-dialog.component';
import { SchedulingComponentService } from './../../_shared/services/scheduling-component.service';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { TableCustom } from '@models/outros/table-custom.model';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TableService } from '@components/tables/table-service';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';
import { Toast } from '@services/outros/toast.service';

@Component({
  templateUrl: './theory-scheduling-page.component.html',
  styleUrls: ['./theory-scheduling-page.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TheorySchedulingPageComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  expandedElement;
  selectedItem;

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
    private _dialog: MatDialog,
    private _filterService: FilterService,
    private _router: Router,
    private _schedulingService: AgendamentoService,
    private _schedulingComponentService: SchedulingComponentService,
    private _tableService: TableService,
    private _toast: Toast
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

  addCandidateToClass(schedule, event) {
    event.stopPropagation();
    this._schedulingComponentService.setSchedule(schedule);
    this._router.navigate([`${ROUTES_APLICATION.schedule.path}/${ROUTES_APLICATION.schedule.addCandidateToClass}/agendamento`, schedule.id]);
  }

  back() {
    this._router.navigate([`/${ROUTES_APLICATION.home}`])
  }

  cancelSchedule(schedule: AgendamentoModel, event) {
    event.stopPropagation();
    const dialogRef = this._dialog.open<CancelScheduleDialogComponent, CancelScheduleDialogInterface>(CancelScheduleDialogComponent, {
      data: {
        tipo: 'TEÓRICA',
        schedule: schedule
      },
      width: '550px',
    });

    this._subscription.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this._subscription.add(
            this._schedulingService.cancelSchedule(schedule.id).subscribe(
              (res) => {
                this._toast.success('Agendamento', 'Agendamento cancelado com sucesso.');
                //this.getSchedules();
              }
            )
          )
        }
      })
    )
  }

  changePaginator(paginator: MatPaginator) {
    this._filter.pageNumber = paginator.pageIndex;
    this._filter.pageSize = paginator.pageSize;
    if (!this._tableService.loading) {
      this._getData();
    }
  }

  goScheduleForm() {
    this._router.navigate([`${ROUTES_APLICATION.schedule.manageSchedule}`], { relativeTo: this._activatedRoute })
  }

  reschedule(schedule: AgendamentoModel, event) {
    event.stopPropagation();
    const dialogRef = this._dialog.open<RescheduleDialogComponent, RescheduleDialogInterface>(RescheduleDialogComponent, {
      data: {
        tipo: 'TEÓRICA',
        schedule: schedule
      },
      width: '600px',
    });

    this._subscription.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this._subscription.add(
            this._schedulingService.reschedule(result).subscribe(
              () => {
                this._toast.success('Reagendamento de Aula', 'A aula foi reagendada com sucesso')
                //this.getSchedules();
              }
            )
          )
        }
      })
    )
  }

  showFilter() {
    this._filterService.changeDisplay();
  }

  private _applyFilter(): void {
    this._subscription.add(
      this._filterService.getResults()
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
    const endpoint = this._schedulingService.pageCount(filter);
    this._tableService.setEndPointPageCount(endpoint);
  }

  private _getData(): void {
    let filter = this._filterService.formatFilterToNormalUser(this._filter, 'cfcCnpj');
    filter.pageNumber++;
    const endpoint = this._schedulingService.getAll(filter);
    this._tableService.setEndPointData(endpoint);
  }


  private _createTable() {
    const tableData: TableCustom = {
      columns: [
        'gradeDescricao',
        'instrutorNome',
        'limiteParticipantes',
        'agenda',
        'inicio',
        'fim',
        'situacao',
        'actions'
      ],
      data: [],
      displayFilter: false,
      displayPaginator: false,
      elementExpansionDataTable: 'aulas',
      pageSize: 5,
      result: {
        noData: `Não existem agendamentos cadastrados para a pesquisa informada.`,
        defaultMessage: `Realize uma busca para exibir os agendamentos existentes.`,
      },
      width: '99%',
      columnData: {
        gradeDescricao: {
          type: TableColumnTypeEnum.STRING,
          element: 'gradeDescricao',
          header: 'GRADE',
        },
        instrutorNome: {
          type: TableColumnTypeEnum.STRING,
          element: 'instrutorNome',
          header: 'INSTRUTOR',
        },
        limiteParticipantes: {
          type: TableColumnTypeEnum.STRING,
          element: 'limiteParticipantes',
          header: 'LIMITE DE PARTICIPANTES',
        },
        agenda: {
          type: TableColumnTypeEnum.STRING,
          element: 'agenda',
          header: 'DATA',
          pipe: TablePipesTypeEnum.DATE
        },
        inicio: {
          type: TableColumnTypeEnum.STRING,
          element: 'agenda',
          header: 'HORA INICIO',
          pipe: TablePipesTypeEnum.TIME_TO_FRONT
        },
        fim: {
          type: TableColumnTypeEnum.STRING,
          element: 'agendaFim',
          header: 'HORA FIM',
          pipe: TablePipesTypeEnum.TIME_TO_FRONT
        },
        situacao: {
          type: TableColumnTypeEnum.STRING,
          element: 'situacao',
          header: 'SITUAÇÃO',
        },
        actions: {
          type: TableColumnTypeEnum.BUTTONS,
          buttonType: 'stroked',
          buttons: [
            {
              icon: 'person_add_alt',
              label: 'CANDIDATO',
              onClick: (data, $event) => this.addCandidateToClass(data, $event),
            },
            {
              icon: 'calendar_today',
              label: 'REAGENDAR',
              onClick: (data, $event) => this.reschedule(data, $event),
            },
            {
              icon: 'highlight_off',
              label: 'CANCELAR',
              onClick: (data, $event) => this.cancelSchedule(data, $event),
            },
            {
              icon: 'info_outline',
              label: 'DETALHES',
              onClick: (data) => null
            },
          ],
        },
      },
    };

    const tableInside: TableCustom = {
      columns: [
        'numeroAula',
        'cursoDescricao',
        'agendamentoAgenda',
        'agendamentoAgendaFim',
        'agendamentoModelo',
        'conteudoProgramatico'
      ],
      result: {
        noData: `Não existem agendamentos cadastrados para a pesquisa informada.`,
        defaultMessage: `Realize uma busca para exibir os agendamentos existentes.`,
      },
      displayFilter: false,
      displayPaginator: false,
      subTitle: null,
      width: '99%',
      data: [],
      columnData: {
        numeroAula: {
          type: TableColumnTypeEnum.STRING,
          element: 'numeroAula',
          header: 'NÚMERO DA AULA',
        },
        cursoDescricao: {
          type: TableColumnTypeEnum.STRING,
          element: 'cursoDescricao',
          header: 'CURSO',
        },
        agendamentoAgenda: {
          type: TableColumnTypeEnum.STRING,
          element: 'inicio',
          header: 'INÍCIO',
          pipe: TablePipesTypeEnum.TIME_TO_FRONT
        },
        agendamentoAgendaFim: {
          type: TableColumnTypeEnum.STRING,
          element: 'fim',
          header: 'FIM',
          pipe: TablePipesTypeEnum.TIME_TO_FRONT
        },
        agendamentoModelo: {
          type: TableColumnTypeEnum.STRING,
          element: 'agendamentoModelo',
          header: 'MODELO',
        },
        conteudoProgramatico: {
          type: TableColumnTypeEnum.STRING,
          element: 'conteudoProgramatico',
          header: 'CONTEÚDO',
        },
      },
    };
    this._tableService.setTableCustom(tableData);
    this._tableService.setExpansionTableCustom(tableInside);
  }

  private _createFilter() {
    let filter: FilterModel[] =
      [
        {
          filterType: FilterTypeEnum.TEXT,
          param: 'cpfInstrutor',
          label: 'CPF INSTRUTOR',
          mask: DefaultMasks.CPF
        },
        {
          filterType: FilterTypeEnum.SELECT,
          param: 'situacao',
          label: 'SITUAÇÃO',
          selectData: CLASS_SITUATION
        },
        {
          filterType: FilterTypeEnum.DATE,
          param: 'dataInicio',
          label: 'DATA INÍCIO'
        },
        {
          filterType: FilterTypeEnum.DATE,
          param: 'dataFim',
          label: 'DATA FINAL'
        },
      ];
    this._filterService.setFilters(filter)
  }

}


