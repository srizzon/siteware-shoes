import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import * as moment from 'moment';

import { AgendamentoModel } from '@models/agendamento/agendamento.model';
import { AgendamentoService } from '@services/apis/agendamento/agendamento.service';
import { AulaModel } from '@models/outros/aula.model';
import { ButtonsMenuEventsEnum } from '@enums/buttons-menu-events.enum';
import { ButtonsMenuModel } from '@models/outros/buttons-menu.model';
import { Candidato } from '@models/gestao/candidato.model';
import { CandidatoAgendamentoService } from '@services/apis/agendamento/candidato-agendamento.service';
import { ConstantModel } from '@models/outros/constant.model';
import { CursoAgendamentoModel } from '@models/agendamento/curso-agendamento.model';
import { CLASS_MODEL } from '@constants/class-model.constants';
import { CLASS_TYPES } from '@constants/class-types.constant';
import { DistribuicaoModel } from '@models/agendamento/distribuicao.model';
import { DistribuicaoService } from '@services/apis/agendamento/distribuicao.service';
import { Helper } from '@utils/helper';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TableCustom } from '@models/outros/table-custom.model';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';
import { Toast } from '@services/outros/toast.service';
import { AgendamentoRequestModel } from '@core/models/agendamento/agendamento-request.model';

@Component({
  templateUrl: './theory-scheduling-form.component.html',
  styleUrls: ['./theory-scheduling-form.component.scss'],
})
export class TheorySchedulingFormComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('inicioElement', { static: false }) inicioElement: ElementRef;
  @ViewChild('fimElement', { static: false }) fimElement: ElementRef;
  buttons: ButtonsMenuModel = new ButtonsMenuModel({
    back: true,
    create: true,
    delete: true,
    enable: false,
    propertyId: 'id',
    propertyActive: 'enabled',
    showButtons: true,
    update: true
  })
  candidate: Candidato = null;
  candidates: Candidato[];
  class: AulaModel = new AulaModel();
  classModel = CLASS_MODEL;
  classTableDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  disabled: boolean = false;
  displayedColumnsClassTable: string[] = ['nroAula', 'curso', 'conteudoProgramatico', 'inicio', 'fim'];
  distribuicao: DistribuicaoModel[] = new Array<DistribuicaoModel>();
  formClass: FormGroup;
  formSchedule: FormGroup;
  maxQuantityClass: number = null;
  schedule: AgendamentoModel = new AgendamentoModel();
  tableData: TableCustom;
  tableClass: TableCustom;
  tipeClassConst = CLASS_TYPES;
  helper;
  courses: CursoAgendamentoModel[] = new Array<CursoAgendamentoModel>();
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _candidateSchedulleService: CandidatoAgendamentoService,
    private _distribuicaoService: DistribuicaoService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _schedulingService: AgendamentoService,
    private _toast: Toast,
    private _cdr: ChangeDetectorRef
  ) {
    this._subscription = new Subscription();
    this.helper = Helper;
  }

  ngOnInit(): void {
    this._initForm();
    this._changeQuantityClass();
  }

  ngAfterViewInit(): void {
    this._setById();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  addCandidate() {
    this._router.navigate([`${ROUTES_APLICATION.schedule.path}/${ROUTES_APLICATION.schedule.addCandidateToClass}/agendamento`, this.schedule.id]);
  }

  buttonsActions(event: ButtonsMenuEventsEnum): void {
    if (event == ButtonsMenuEventsEnum.BACK) this._back();
    if (event == ButtonsMenuEventsEnum.CANCEL) this._changeEnableForm();
    if (event == ButtonsMenuEventsEnum.CREATE) this._create();
    if (event == ButtonsMenuEventsEnum.DELETE) this._delete();
    if (event == ButtonsMenuEventsEnum.EDIT) this._changeEnableForm();
    if (event == ButtonsMenuEventsEnum.UPDATE) this._create();
  }

  checkFieldInicio() {
    const data = moment(new Date()).format('YYYY-MM-DD');
    const hora = this.formSchedule.get('inicio').value;
    const validTime = Helper.formatDateUtc(data, hora);
    if (validTime == 'Data inválida') {
      this._toast.info('Hora Início', 'Formato inválido');
      this.formSchedule.get('inicio').setValue('');
      this.inicioElement.nativeElement.focus();
    }
  }

  checkFieldFim() {
    const data = moment(new Date()).format('YYYY-MM-DD');
    const hora = this.formSchedule.get('fim').value;
    const validTime = Helper.formatDateUtc(data, hora);
    if (validTime == 'Data inválida') {
      this._toast.info('Hora Fim', 'Formato inválido');
      this.formSchedule.get('fim').setValue('');
      this.fimElement.nativeElement.focus();
    }
  }

  createItensClass() {
    const agendamento = this.formSchedule.getRawValue();
    if (!agendamento.curso) {
      this._toast.info('Curso', 'É necessário escolher um Curso');
      return;
    }
    if (!agendamento.turno) {
      this._toast.info('Turno', 'É necessário escolher um Turno');
      return;
    }
    if (!agendamento.agenda) {
      this._toast.info('Data', 'É necessário informar uma data');
      return;
    }
    if (!agendamento.inicio) {
      this._toast.info('Início', 'É necessário informar a hora início');
      return;
    }
    if (!agendamento.fim) {
      this._toast.info('Fim', 'É necessário informar a hora final');
      return;
    }
    this.checkFieldInicio();
    this.checkFieldFim();
    this.formClass = this._formBuilder.group({});
    const filter = {
      inicio: agendamento.inicio,
      fim: agendamento.fim,
      turno: agendamento.turno,
    };
    const conteudoProgramatico = this.formSchedule.get('conteudoProgramatico').value;
    const curso = this.formSchedule.get('curso').value;

    this._subscription.add(
      this._distribuicaoService.getDistribuicaoByHorarioTurno(filter).subscribe(
        (res) => {
          this.distribuicao = Object.assign([], res);
          res.forEach((item) => {
            this.formClass.addControl('nroAula_' + item.posicao, this._formBuilder.control(''));
            this.formClass.addControl('conteudo_' + item.posicao, this._formBuilder.control(conteudoProgramatico));
            this.formClass.addControl('curso_' + item.posicao, this._formBuilder.control(curso.id));
            this.formClass.addControl('inicio_' + item.posicao, this._formBuilder.control({ value: item.inicio, disabled: true }));
            this.formClass.addControl('fim_' + item.posicao, this._formBuilder.control({ value: item.fim, disabled: true }));
          });
          this.classTableDataSource.data = Object.assign([], this.distribuicao);
          this._cdr.detectChanges();
        }
      )
    )
  }

  setMaxQuantity(event): void {
    const modelo = this.formSchedule.get('modelo').value;
    if (modelo && modelo.id == 1 && event.value > 35) {
      this.formSchedule.get('limiteParticipantes').setValue(35);
      this._toast.info('Limite Participantes', `A quantidade de participantes não pode ser maior que ${35}`)
    } else if (modelo && modelo.id == 2 && event.value > 60) {
      this.formSchedule.get('limiteParticipantes').setValue(60);
      this._toast.info('Limite Participantes', `A quantidade de participantes não pode ser maior que ${60}`)
    }
  }

  private _back(): void {
    this._router.navigate([`/${ROUTES_APLICATION.schedule.path}/${ROUTES_APLICATION.schedule.theory}`], { relativeTo: this._activatedRoute });
  }

  private _changeEnableForm(): void {

  }
  private _create(): void {
    let schedule: AgendamentoRequestModel = new AgendamentoRequestModel();
    let values = this.formSchedule.getRawValue();
    let aulas: AulaModel[] = new Array<AulaModel>();

    this.distribuicao.forEach((element) => {
      let aula = new AulaModel();
      aula.cursoId = this.formClass.get('curso_' + element.posicao).value.idExterno;
      aula.conteudoProgramatico = this.formClass.get('conteudo_' + element.posicao).value;
      aula.fim = Helper.formatDateUtc(values.agenda, this.formClass.get('fim_' + element.posicao).value);
      aula.idExterno = '';
      aula.inicio = Helper.formatDateUtc(values.agenda, this.formClass.get('inicio_' + element.posicao).value);
      aula.intervalo = 0;
      aula.numeroAula = this.formClass.get('nroAula_' + element.posicao).value;
      aulas.push(aula);
    });

    schedule.agenda = Helper.formatDateUtc(values.agenda, values.inicio);
    schedule.agendaFim = Helper.formatDateUtc(values.agenda, values.fim);
    schedule.aulas = aulas;
    schedule.cfcId = this.formSchedule.get('cfc').value.id;
    schedule.instrutorId = this.formSchedule.get('instrutor').value.id;
    schedule.intervalo = values.intervalo;
    schedule.limiteParticipantes = values.limiteParticipantes;
    schedule.modelo = values.modelo.descricao;
    schedule.permiteCancelamento = values.permiteCancelamento;
    schedule.servicoId = values.servico.id;
    schedule.situacao = values.situacao;
    schedule.turno = values.turno;
    schedule.tipoAgendamentoId = values.tipoAulaId;

    let END_POINT;
    if (this.schedule.id) {
      END_POINT = this._schedulingService.update(schedule);
    } else {
      END_POINT = this._schedulingService.create(schedule);
    }

    this._subscription.add(
      END_POINT.pipe(take(1)).subscribe(
        () => {
          this._toast.success('Agendamento', 'Agendamento salvo com sucesso')
          this._back();
        }
      )
    )
  }

  private _createTable(candidates): void {
    this.tableData = {
      columns: ['name', 'cpf', 'telefone', 'email', 'actions'],
      title: 'Listagem de Candidatos',
      width: '82%',
      data: candidates,
      result: {
        noData: `Não existem CANDIDATOS cadastrados para a pesquisa informada.`,
        defaultMessage: `Realize uma busca para exibir os CANDIDATOS existentes.`,
      },
      columnData: {
        name: {
          header: 'NOME',
          type: TableColumnTypeEnum.STRING,
          element: 'name',
        },
        cpf: {
          header: 'CPF',
          type: TableColumnTypeEnum.STRING,
          element: 'cpf',
        },
        telefone: {
          header: 'TELEFONE',
          type: TableColumnTypeEnum.STRING,
          element: 'telefone',
        },
        email: {
          header: 'EMAIL',
          type: TableColumnTypeEnum.STRING,
          element: 'dateOfBirth',
          pipe: TablePipesTypeEnum.DATE,
        },
        actions: {
          header: 'AÇÕES',
          buttonType: 'icons',
          type: TableColumnTypeEnum.BUTTONS,
          buttons: [
            {
              icon: 'delete',
              onClick: (data) => this._deleteCandidate(data),
            },
          ],
        },
      },
    };
  }

  private _createTableClass(data?): void {
    this.tableClass = {
      columns: [
        'conteudoProgramatico',
        'inicio',
        'fim',
        'intervalo',
        'numeroAula',
        'actions',
      ],
      title: 'Listagem de Aulas',
      width: '100%',
      data: data,
      result: {
        noData: '',
        defaultMessage: '',
      },
      columnData: {
        conteudoProgramatico: {
          header: 'CONTEÚDO PROGRAMÁTICO',
          type: TableColumnTypeEnum.STRING,
          element: 'conteudoProgramatico',
        },
        inicio: {
          header: 'INICIO',
          type: TableColumnTypeEnum.STRING,
          element: 'inicio',
          pipe: TablePipesTypeEnum.TIME_TO_FRONT,
        },
        fim: {
          header: 'FIM',
          type: TableColumnTypeEnum.STRING,
          element: 'fim',
          pipe: TablePipesTypeEnum.TIME_TO_FRONT,
        },
        intervalo: {
          header: 'INTERVALO',
          type: TableColumnTypeEnum.STRING,
          element: 'intervalo',
        },
        numeroAula: {
          header: 'NÚMERO AULA',
          type: TableColumnTypeEnum.STRING,
          element: 'numeroAula',
        },
        actions: {
          header: 'AÇÕES',
          buttonType: 'icons',
          type: TableColumnTypeEnum.BUTTONS,
          buttons: [
            {
              icon: 'delete',
              onClick: (data) => this._deleteCandidate(data),
            },
          ],
        },
      },
    };
  }

  private _deleteCandidate(candidate): void {
    const id = this._activatedRoute.snapshot.params.id;
    this._subscription.add(
      this._candidateSchedulleService.removeCandidateFromClass(id)
        .subscribe(
          () => {
            this._toast.success('Agendamento', 'Candidado removido com sucesso.');
            const index = this.tableData.data.findIndex((x) => x.id === candidate.id);
            this.tableData.data.splice(index, 1);
            this.tableData = Object.assign({}, this.tableData);
          }
        )
    )
  }

  private _delete(): void {

  }

  private _initForm(): void {
    this.formSchedule = this._formBuilder.group({
      agenda:               ['', [Validators.required]],
      cfc:                  ['', [Validators.required]],
      conteudoProgramatico: [''],
      curso:                ['', [Validators.required]],
      fim:                  ['', [Validators.required]],
      inicio:               ['', [Validators.required]],
      instrutor:            ['', [Validators.required]],
      intervalo:            [''],
      limiteParticipantes:  ['', [Validators.required],],
      modelo:               ['', [Validators.required]],
      numeroAula:           [''],
      permiteCancelamento:  [''],
      servico:              ['', [Validators.required]],
      situacao:             [{ value: 'AGENDADA', disabled: true }, [Validators.required]],
      tipoAulaId:           ['', [Validators.required]],
      turno:                ['', [Validators.required]],
    });
    this.formClass = this._formBuilder.group({});
  }


  private _setById(): void {
    if (this._activatedRoute.snapshot.params.id) {
      this.schedule = this._activatedRoute.snapshot.data['schedule'][0];
      this._createTable(this._activatedRoute.snapshot.data['candidate']);
      this._cdr.detectChanges();
      this._updateForm();
    }
  }

  private _updateForm() {
    this.formSchedule.get('agenda').setValue(this.schedule.agenda);
    this.formSchedule.get('cfc').setValue(this.schedule.cfcCnpj);
    this.formSchedule.get('conteudoProgramatico').setValue(this.class.conteudoProgramatico);
    this.formSchedule.get('curso').setValue(this.class.cursoId);
    this.formSchedule.get('fim').setValue(this.schedule.fim);
    this.formSchedule.get('inicio').setValue(this.schedule.inicio);
    this.formSchedule.get('instrutor').setValue(this.schedule.instrutorCpf);
    this.formSchedule.get('intervalo').setValue(this.class.intervalo);
    this.formSchedule.get('limiteParticipantes').setValue(this.schedule.limiteParticipantes);
    this.formSchedule.get('modelo').setValue(this.schedule.modelo);
    this.formSchedule.get('numeroAula').setValue(this.class.numeroAula);
    this.formSchedule.get('permiteCancelamento').setValue(this.schedule.permiteCancelamento);
    this.formSchedule.get('servico').setValue(this.schedule.servicoId);
    this.formSchedule.get('situacao').setValue(this.schedule.situacao);
    this.formSchedule.get('tipoAulaId').setValue(this.schedule.tipoAgendamentoId);
    this.formSchedule.get('turno').setValue(this.schedule.turno);
  }



  private _changeQuantityClass(): void {
    this.formSchedule.get('modelo').valueChanges.subscribe(
      (res: ConstantModel) => {
        if (res.id === 1) {
          this.maxQuantityClass = 35;
          this.formSchedule.get('limiteParticipantes').setValue(35);
        } else if (res.id === 2) {
          this.maxQuantityClass = 60;
          this.formSchedule.get('limiteParticipantes').setValue(60);
        }
      }
    )
  }
}
