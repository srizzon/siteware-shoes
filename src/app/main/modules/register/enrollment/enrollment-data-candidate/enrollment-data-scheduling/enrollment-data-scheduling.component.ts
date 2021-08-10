import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription, Observable, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { CandidatoAgendamentoService } from '@services/apis/agendamento/candidato-agendamento.service';
import { FilterPaginationModel } from '@models/outros/filter-pagination.model';
import { FilterService } from '@services/outros/filter.service';
import { TableCustom } from '@models/outros/table-custom.model';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';
import { TableService } from '@components/tables/table-service';


@Component({
  selector: 'app-enrollment-data-scheduling',
  templateUrl: './enrollment-data-scheduling.component.html',
  styleUrls: ['./enrollment-data-scheduling.component.scss']
})
export class EnrollmentDataSchedulingComponent implements OnInit, OnDestroy {

  results$: Observable<any>
  subject: Subject<any> = new Subject();
  tableData: TableCustom;
  private _subscription: Subscription;
  private _filter: FilterPaginationModel = {
    pageNumber: 0,
    pageSize: 5,
  };
  private _filterBackup: FilterPaginationModel = {
    pageNumber: 0,
    pageSize: 5,
  }

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _candidateSchedulleService: CandidatoAgendamentoService,
    private _filterService: FilterService,
    private _tableService: TableService,
  ) {
    this._subscription = new Subscription();
   }


   ngOnInit(): void {
    this._filterService.resetFilter();
    this._filter['matriculaIdExterno'] = this._activatedRoute.snapshot.params.id
    this._filterBackup['matriculaIdExterno'] = this._activatedRoute.snapshot.params.id
    this._applyFilter();
    this._countPage();
    this._createTable();
    this._getData();

  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  applyFilter(event): void {
    const searchText = event.target.value;
    this.subject.next(searchText)
  }

  changePaginator(paginator: MatPaginator) {
    this._filter.pageNumber = paginator.pageIndex;
    this._filter.pageSize = paginator.pageSize;
    if (!this._tableService.loading) {
      this._getData();
    }
  }

  private _applyFilter(): void {
    this._subscription.add(
      this.subject
        .pipe(debounceTime(500))
        .subscribe((res) => {
          this._filter = Object.assign({}, this._filterBackup)
          if (res) {
            this._filter['nome'] = res;
          }
          this._countPage();
          this._getData();
        })
    )
  }

  private _createTable(): void {
    const tableData: TableCustom = {
      columns: ['data', 'situacao', 'instrutor', 'start', 'end'],
      columnData: {
        data: {
          header: 'DATA',
          type: TableColumnTypeEnum.STRING,
          element: 'agendamentoAgenda',
          pipe: TablePipesTypeEnum.DATE,
        },
        situacao: {
          header: 'SITUAÇÃO',
          type: TableColumnTypeEnum.STRING,
          element: 'agendamentoSituacao',
        },
        instrutor: {
          header: 'INSTRUTOR',
          type: TableColumnTypeEnum.STRING,
          element: 'agendamentoInstrutorNome',
        },
        start: {
          header: 'Inicio',
          type: TableColumnTypeEnum.STRING,
          element: 'agendamentoAgenda',
          pipe: TablePipesTypeEnum.TIME_TO_FRONT,
        },
        end: {
          header: 'Término',
          type: TableColumnTypeEnum.STRING,
          element: 'agendamentoAgendaFim',
          pipe: TablePipesTypeEnum.TIME_TO_FRONT,
        },
      },
      data: [],
      pageSize: 5,
      result: {
        noData: 'Não existe agendamentos para esse candidato.',
        defaultMessage: 'Não existe agendamentos para esse candidato.',
      },
      subTitle: 'Listagem de aulas existentes por data',
      title: 'Tabela de Agendamento',
      width: '82%',
    };
    this._tableService.setTableCustom(tableData);
  }


  private _countPage(): void {
    let filter = Object.assign({}, this._filterService.formatFilterToNormalUser(this._filter, 'cfcCnpj'));
    delete filter.pageNumber;
    filter.pageSize = 1;
    const endpoint = this._candidateSchedulleService.pageCount(filter);
    this._tableService.setEndPointPageCount(endpoint);
  }

  private _getData(): void {
    let filter = this._filterService.formatFilterToNormalUser(this._filter, 'cfcCnpj');
    filter.pageNumber++;
    const endpoint = this._candidateSchedulleService.getAll(filter);
    this._tableService.setEndPointData(endpoint);
  }
}
