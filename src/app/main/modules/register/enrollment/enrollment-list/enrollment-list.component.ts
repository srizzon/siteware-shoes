import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { DefaultMasks } from '@enums/default-masks.enum';
import { FilterModel } from '@models/outros/filter.model';
import { FilterPaginationModel } from '@models/outros/filter-pagination.model';
import { FilterService } from '@services/outros/filter.service';
import { FilterTypeEnum } from '@enums/filter-type.enum';
import { MatriculaGestaoModel } from '@models/gestao/matricula-gestao.model';
import { MatriculaService } from '@services/apis/gestao/matricula.service';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TableCustom } from '@models/outros/table-custom.model';
import { TableService } from '@components/tables/table-service';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';
@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.scss'],
})
export class EnrollmentListComponent implements OnInit, OnDestroy {

  enrollments: MatriculaGestaoModel[];
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
    private _matriculaService: MatriculaService,
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

  infoCandidate(matricula: MatriculaGestaoModel): void {
    this._router.navigate([`${ROUTES_APLICATION.register.enrollmentData}`, matricula.id, matricula.candidatoCpf], { relativeTo: this._activatedRoute });
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
    const endpoint = this._matriculaService.pageCount(filter);
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
        'matricula',
        'nome',
        'cpf',
        'cfc',
        'servicoProcessoAtual',
        'categoriaProcessoAtual',
        'situacaoProcessoAbert',
        'renachProcessoAtual',
        'registerSituation',
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
        matricula: {
          header: 'MATRICULA',
          type: TableColumnTypeEnum.STRING,
          element: 'numero',
        },
        servicoProcessoAtual: {
          header: 'SERVIÇO',
          type: TableColumnTypeEnum.OBJECT,
          element: 'processo.servico.nome',
        },
        categoriaProcessoAtual: {
          header: 'CAT.',
          type: TableColumnTypeEnum.OBJECT,
          element: 'processo.categoriaCnh.categoria',
        },
        nome: {
          header: 'NOME',
          type: TableColumnTypeEnum.OBJECT,
          element: 'candidato.nome',
        },
        cpf: {
          header: 'CPF',
          type: TableColumnTypeEnum.STRING,
          element: 'candidatoCpf',
          pipe: TablePipesTypeEnum.CPF
        },
        renachProcessoAtual: {
          header: 'RENACH',
          type: TableColumnTypeEnum.OBJECT,
          element: 'processo.renach',
        },
        situacaoProcessoAbert: {
          header: 'SIT. PROCESSO',
          type: TableColumnTypeEnum.OBJECT,
          element: 'processo.situacao',
        },
        phone: {
          header: 'TELEFONE',
          type: TableColumnTypeEnum.STRING,
          element: 'candidatoTelefone',
        },
        email: {
          header: 'EMAIL',
          type: TableColumnTypeEnum.STRING,
          element: 'candidatoEmail',
        },
        cfc: {
          header: 'CFC',
          type: TableColumnTypeEnum.STRING,
          element: 'cfcNome',
        },
        registerSituation: {
          header: 'SIT. MATRICULA',
          type: TableColumnTypeEnum.STRING,
          element: 'status',
          pipe: TablePipesTypeEnum.SITUATION_REGISTRATION
        },
        actions: {
          header: 'AÇÕES',
          buttonType: 'stroked',
          type: TableColumnTypeEnum.BUTTONS,
          buttons: [
            {
              icon: 'info',
              label: 'DETALHES',
              onClick: (data) => this.infoCandidate(data)
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
    const endpoint = this._matriculaService.getAll(filter);
    this._tableService.setEndPointData(endpoint);
  }
}
