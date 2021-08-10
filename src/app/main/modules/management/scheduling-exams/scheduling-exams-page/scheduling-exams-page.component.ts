import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { TablePipesTypeEnum } from '@core/enums/table-pipes-types.enum';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import { ConstantModel } from '@models/outros/constant.model';
import { ConfirmCommentsDialogComponent, ConfirmCommentsDialogInterface } from '@components/dialogs/confirm-comments-dialog/confirm-comments-dialog.component';
import { DefaultMasks } from '@enums/default-masks.enum';
import { FilterPaginationModel } from '@models/outros/filter-pagination.model';
import { FilterModel } from '@models/outros/filter.model';
import { FilterTypeEnum } from '@enums/filter-type.enum';
import { FilterService } from '@services/outros/filter.service';
import { MarcacaoExameModel } from '@models/gestao/marcacao-exame.model';
import { MarcacaoExameService } from '@services/apis/gestao/marcacao-exames.service';
import { REPORT_SITUATION } from '@constants/report-situation.constants';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { ServicesSubject } from '@services/outros/services-subjects.service';
import { TableCustom } from '@models/outros/table-custom.model';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TableService } from '@components/tables/table-service';
import { Toast } from '@services/outros/toast.service';
import { UserControllerService } from '@services/outros/user-controller.service';
import { Subscription } from 'rxjs';
import { SHIFT_MODEL } from '@constants/shift-model.constants';

@Component({
  templateUrl: './scheduling-exams-page.component.html',
  styleUrls: ['./scheduling-exams-page.component.scss'],
})
export class SchedulingExamsPageComponent implements OnInit, OnDestroy {

  marcacaoExames: MarcacaoExameModel[] = new Array<MarcacaoExameModel>();
  locaisExames: ConstantModel[] = new Array<ConstantModel>();
  tableMarcacaoExames: TableCustom;
  tiposExames: ConstantModel[] = new Array<ConstantModel>();

  private _filter: FilterPaginationModel = {
    pageNumber: 0,
    pageSize: 25,
    orderByfield: 'dataCadastro',
    orderByType: 'desc'
  };
  private _filterBackup: FilterPaginationModel = {
    pageNumber: 0,
    pageSize: 25,
    orderByfield: 'dataCadastro',
    orderByType: 'desc'
  }
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _filterService: FilterService,
    private _marcacaoExameService: MarcacaoExameService,
    private _router: Router,
    private _serviceSubject: ServicesSubject,
    private _tableService: TableService,
    private _toast: Toast,
    private _userService: UserControllerService
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    if (this._userService.isAdmin()) {
      delete this._filter.orderByfield;
      delete this._filter.orderByType;
      delete this._filterBackup.orderByfield;
      delete this._filterBackup.orderByType;
    }
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

  add(): void {
    this._router.navigate([`${ROUTES_APLICATION.management.path}/${ROUTES_APLICATION.management.schedulingExams}/${ROUTES_APLICATION.add}`]);
  }

  cancel(data) {
    const dialogRef = this._dialog.open<ConfirmCommentsDialogComponent, ConfirmCommentsDialogInterface>(ConfirmCommentsDialogComponent, {
      data: {
        title: 'Cancelar Marcação de Exame',
        text: `Informe o motivo do cancelamento para o exame: ${data.exameDescricao} - ${moment(data.dataHora).format('DD/MM/YYYY HH:mm')} - ${data.candidatoNome} `,
        comments: '',
      },
      width: '600px',
      minHeight: '330px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._marcacaoExameService.cancel(data.id, result.comments).subscribe(
          (res) => {
            data.situacao = res.situacao;
            this._toast.success('Marcação de exame cancelada com sucesso.', 'Marcação de Exame');
          }
        );
      }
    });
  }

  changePaginator(paginator: MatPaginator) {

    this._filter.pageNumber = paginator.pageIndex;
    this._filter.pageSize = paginator.pageSize;

    if (!this._tableService.loading) {
      this._getData();
    }

  }

  check(data) {
    return data.situacao != 'AGENDADO';
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
    const endpoint = this._marcacaoExameService.pageCount(filter);
    this._tableService.setEndPointPageCount(endpoint);
  }

  private _createFilter(): void {
    let filter: FilterModel[] =
      [
        {
          filterType: FilterTypeEnum.DATE,
          param: 'dataInicioInsercao',
          label: 'DATA SOLICITAÇÃO INICIAL'
        },
        {
          filterType: FilterTypeEnum.DATE,
          param: 'dataFimInsercao',
          label: 'DATA SOLICITAÇÃO FINAL'
        },
        {
          filterType: FilterTypeEnum.DATE,
          param: 'dataInicio',
          label: 'DATA DO EXAME - INICIAL'
        },
        {
          filterType: FilterTypeEnum.DATE,
          param: 'dataFim',
          label: 'DATA DO EXAME FINAL'
        },
        {
          filterType: FilterTypeEnum.SELECT,
          param: 'marcacaoExameSituacao',
          label: 'STATUS',
          selectData: REPORT_SITUATION
        },
        {
          filterType: FilterTypeEnum.SELECT,
          param: 'idExame',
          label: 'TIPO DE EXAME',
          selectData: this.tiposExames
        },
        {
          filterType: FilterTypeEnum.TEXT,
          param: 'cpf',
          label: 'CPF CANDIDATO',
          mask: DefaultMasks.CPF
        },
        {
          filterType: FilterTypeEnum.TEXT,
          param: 'renach',
          label: 'RENACH'
        },
        {
          filterType: FilterTypeEnum.TEXT,
          param: 'cpfInstrutor',
          label: 'CPF INSTRUTOR',
          mask: DefaultMasks.CPF
        },
        {
          filterType: FilterTypeEnum.TEXT,
          param: 'veiculoPlaca',
          label: 'PLACA DO VEÍCULO',
          mask: DefaultMasks.PLACA
        },
        {
          filterType: FilterTypeEnum.NUMBER,
          param: 'cfcId',
          label: 'CFC'
        },
        {
          filterType: FilterTypeEnum.SELECT,
          param: 'turno',
          label: 'TURNO',
          selectData: SHIFT_MODEL
        },
        {
          filterType: FilterTypeEnum.TEXT,
          param: 'horaInicio',
          label: 'HORA INÍCIO',
          mask: DefaultMasks.HORA,
          sendSpecialCharacters: true
        },
        {
          filterType: FilterTypeEnum.TEXT,
          param: 'horaFim',
          label: 'HORA FIM',
          mask: DefaultMasks.HORA,
          sendSpecialCharacters: true
        },
      ];
    if (this._userService.isAdmin()) {
      filter.push({
        filterType: FilterTypeEnum.LOCAL_EXAME,
        param: 'idLocal',
        label: 'LOCAL DO EXAME',
        selectData: this.locaisExames
      })
    }
    this._filterService.setFilters(filter)
  }

  private _createTable(): void {
    const tableReport: TableCustom = {
      columns: [
        'candidatoCpf',
        'matriculaProcessoRenach',
        'candidatoNome',
        'instrutorNome',
        'cfcNome',
        'exameDescricao',
        'localDescricao',
        'veiculoPlaca',
        'dataCadastro',
        'dataHora',
        'situacao',
        'retorno',
        'actions',
      ],
      data: [],
      orderBy: true,
      pageSize: 25,
      result: {
        noData: `Não existe dados para os valores informados no filtro.`,
        defaultMessage: `Realize uma busca para exibir os relatórios.`,
      },
      width: '100%',
      columnData: {
        candidatoCpf: {
          header: 'CPF',
          type: TableColumnTypeEnum.STRING,
          element: 'candidatoCpf',
          pipe: TablePipesTypeEnum.CPF
        },
        matriculaProcessoRenach: {
          header: 'RENACH',
          type: TableColumnTypeEnum.STRING,
          element: 'matriculaProcessoRenach',
        },
        candidatoNome: {
          header: 'NOME',
          type: TableColumnTypeEnum.STRING,
          element: 'candidatoNome',
        },
        instrutorNome: {
          header: 'INSTRUTOR',
          type: TableColumnTypeEnum.STRING,
          element: 'instrutorNome',
        },
        cfcNome: {
          header: 'CFC',
          type: TableColumnTypeEnum.STRING,
          element: 'cfcNome',
        },
        exameDescricao: {
          header: 'EXAME',
          type: TableColumnTypeEnum.STRING,
          element: 'exameDescricao',
        },
        localDescricao: {
          header: 'LOCAL',
          type: TableColumnTypeEnum.STRING,
          element: 'localDescricao',
        },
        veiculoPlaca: {
          header: 'VEICULO',
          type: TableColumnTypeEnum.STRING,
          element: 'veiculoPlaca',
        },
        dataCadastro: {
          header: 'DATA SOLICITAÇÃO',
          type: TableColumnTypeEnum.STRING,
          element: 'dataCadastro',
          pipe: TablePipesTypeEnum.DATE_AND_TIME
        },
        dataHora: {
          header: 'DATA EXAME',
          type: TableColumnTypeEnum.STRING,
          element: 'dataHora',
          pipe: TablePipesTypeEnum.DATE_AND_TIME
        },
        situacao: {
          header: 'SITUAÇÃO',
          type: TableColumnTypeEnum.STRING,
          element: 'situacao',
        },
        retorno: {
          header: 'RETORNO',
          type: TableColumnTypeEnum.STRING,
          element: 'retorno',
        },
        actions: {
          type: TableColumnTypeEnum.BUTTONS,
          buttonType: 'stroked',
          header: 'AÇÕES',
          buttons: [
            {
              icon: 'info',
              label: 'DETALHES',
              onClick: (data) => this._info(data)
            }
          ]
        }
      },
    };
    this._tableService.setTableCustom(tableReport);
  }

  private _getData(): void {
    let filter = this._filterService.formatFilterToNormalUser(this._filter, 'cfcCnpj');
    filter.pageNumber++;
    const endpoint = this._marcacaoExameService.getAll(filter);
    this._tableService.setEndPointData(endpoint);
  }

  private _info(exam: MarcacaoExameModel) {
    this._router.navigate([`${ROUTES_APLICATION.management.path}/${ROUTES_APLICATION.management.schedulingExams}/${ROUTES_APLICATION.detail}`, exam.id]);
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
