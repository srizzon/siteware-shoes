import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { CLASS_MODEL } from '@constants/class-model.constants';
import { CfcAgendamentoModel } from '@models/agendamento/cfc-agendamento.model';
import { GradeModel } from '@models/agendamento/grade.model';
import { GradesService } from '@services/apis/agendamento/grades.service';
import { InstrutorAgendamentoModel } from '@models/agendamento/instrutor-agendamento.model';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { ServicoAgendamentoModel } from '@models/agendamento/servico-agendamento.model';
import { SITUATIONS } from '@constants/situation.constants';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TableCustom } from '@models/outros/table-custom.model';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';

export interface GridForm {
  service: ServicoAgendamentoModel;
  model: string;
  situation: string;
  cfc: CfcAgendamentoModel;
  instructor: InstrutorAgendamentoModel;
  turno: string
}

@Component({
  selector: 'app-grid-page',
  templateUrl: './grid-page.component.html',
  styleUrls: ['./grid-page.component.scss'],
})
export class GridPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  situations = SITUATIONS;
  classModel = CLASS_MODEL;
  tableData: TableCustom;
  private _subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private gradesService: GradesService,
    private router: Router,
    private _cdr: ChangeDetectorRef
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      service: [''],
      model: [''],
      situation: [''],
      cfc: [''],
      instructor: [''],
      turno: [''],
    });
  }

  onSubmit(): void {
    const values: GridForm = this.form.getRawValue();
    let payload: any = {};
    if (values.turno) payload.turno = values.turno;
    if (values.model) payload.model = values.model;
    if (values.cfc) payload.cfcId = values.cfc.id;
    if (values.instructor) payload.instrutorId = values.instructor.id;
    if (values.service) payload.servicoId = values.service.id;
    this._subscription.add(
      this.gradesService
        .getAll(payload)
        .subscribe((res) => {
          if (res) {
            res.forEach((element) => {
              element.situacao = SITUATIONS.find((s) => s.enum === element.situacao).descricao;
            });
            this.createTable(<GradeModel[]>res);
          } else {
            this.createTable([]);
          }
        })
    )
  }

  addGrid(): void {
    this.router.navigate([`${ROUTES_APLICATION.add}`], { relativeTo: this.activatedRoute });
  }

  info(data): void {
    this.router.navigate([`${ROUTES_APLICATION.detail}/${data.id}`], { relativeTo: this.activatedRoute });
  }

  editGridCandidates(data): void {
    this.router.navigate([`${ROUTES_APLICATION.schedule.path}/${ROUTES_APLICATION.schedule.addCandidateToClass}/grid`, data.id]);
  }

  createTable(rows: GradeModel[]): void {
    this.tableData = {
      columns: [
        'description',
        'shift',
        'startDate',
        'endDate',
        'situation',
        'roomsAmount',
        'service',
        'instructor',
        'model',
        'cfc',
        'actions',
      ],
      title: 'Tabela de Grade',
      subTitle: null,
      width: '98%',
      result: {
        noData: `Não existem grades cadastradas para a pesquisa informada.`,
        defaultMessage: `Realize uma busca para exibir as grades existentes.`,
      },
      columnData: {
        startDate: {
          type: TableColumnTypeEnum.STRING,
          element: 'dataInicio',
          header: 'ÍNICIO',
          pipe: TablePipesTypeEnum.DATE,
        },
        shift: {
          type: TableColumnTypeEnum.STRING,
          element: 'turno',
          header: 'PERÍODO',
        },
        endDate: {
          type: TableColumnTypeEnum.STRING,
          element: 'dataTermino',
          header: 'TÉRMINO (PREV.)',
          pipe: TablePipesTypeEnum.DATE,
        },
        situation: {
          type: TableColumnTypeEnum.STRING,
          element: 'situacao',
          header: 'SITUAÇÃO',
        },
        roomsAmount: {
          type: TableColumnTypeEnum.STRING,
          element: 'qtdVagasDisponiveis',
          header: 'VAGAS',
        },
        service: {
          type: TableColumnTypeEnum.STRING,
          element: 'servicoDescricao',
          header: 'SERVIÇO',
        },
        instructor: {
          type: TableColumnTypeEnum.STRING,
          element: 'instrutorNome',
          header: 'INSTRUTOR',
        },
        model: {
          type: TableColumnTypeEnum.STRING,
          element: 'modelo',
          header: 'MODELO',
        },
        cfc: {
          type: TableColumnTypeEnum.STRING,
          element: 'cfcNome',
          header: 'CFC',
        },
        description: {
          type: TableColumnTypeEnum.STRING,
          element: 'descricao',
          header: 'DESCRIÇÃO',
        },
        actions: {
          type: TableColumnTypeEnum.BUTTONS,
          buttonType: 'stroked',
          header: 'AÇÕES',
          buttons: [
            {
              icon: 'info',
              label: 'VISUALIZAR',
              onClick: (data) => this.info(data),
            },
            {
              icon: 'person_add_alt',
              label: 'CANDIDATO',
              onClick: (data) => this.editGridCandidates(data),
            },
          ],
        },
      },
      data: rows,
    };
  }
}
