import { ServicesSubject } from '@services/outros/services-subjects.service';
import { AulaModel } from './../../../../../core/models/agendamento/aula.model';
import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { AgendamentoModel } from '@models/agendamento/agendamento.model';
import { CLASS_TYPES } from '@constants/class-types.constant';
import { CLASS_MODEL } from '@constants/class-model.constants';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { TableCustom } from '@models/outros/table-custom.model';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';


@Component({
  selector: 'app-available-classes-detail',
  templateUrl: './available-classes-detail.component.html',
  styleUrls: ['./available-classes-detail.component.scss']
})
export class AvailableClassesDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  classModel = CLASS_MODEL;
  formClass: FormGroup;
  schedule: AgendamentoModel = new AgendamentoModel();
  tableData: TableCustom;
  tipeClassConst = CLASS_TYPES;
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _servicesSubject: ServicesSubject
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._initForm();
  }

  ngAfterViewInit(): void {
    this._setById();
    this._cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }


  back() {
    this._router.navigate([`/${ROUTES_APLICATION.schedule.path}/${ROUTES_APLICATION.schedule.availableClasses}`]);
  }


  private _createTable() {
    this.tableData = {
      columns: [
        'nroAula',
        'curso',
        'conteudoProgramatico',
        'data',
        'inicio',
        'fim',
      ],
      title: 'Tabela de Aulas Disponíveis',
      subTitle: '',
      width: '99%',
      result: {
        noData: `Não existem turmas cadastradas para a pesquisa informada.`,
        defaultMessage: `Realize uma busca para exibir turmas existentes.`,
      },
      columnData: {
        nroAula: {
          type: TableColumnTypeEnum.STRING,
          element: 'numeroAula',
          header: 'NÚMERO DA AULA',
        },
        curso: {
          type: TableColumnTypeEnum.STRING,
          element: 'cursoDescricao',
          header: 'CURSO',
        },
        conteudoProgramatico: {
          type: TableColumnTypeEnum.STRING,
          element: 'conteudoProgramatico',
          header: 'DATA',
        },
        data: {
          type: TableColumnTypeEnum.STRING,
          element: 'inicio',
          header: 'DATA',
          pipe: TablePipesTypeEnum.DATE
        },
        inicio: {
          type: TableColumnTypeEnum.STRING,
          element: 'inicio',
          header: 'INÍCIO',
          pipe: TablePipesTypeEnum.TIME_TO_FRONT
        },
        fim: {
          type: TableColumnTypeEnum.STRING,
          element: 'fim',
          header: 'FIM',
          pipe: TablePipesTypeEnum.TIME_TO_FRONT
        },
        limiteParticipantes: {
          type: TableColumnTypeEnum.STRING,
          element: 'limiteParticipantes',
          header: 'VAGAS',
        },
        instrutorNome: {
          type: TableColumnTypeEnum.STRING,
          element: 'instrutorNome',
          header: 'INSTRUTOR',
        },
        cfcNome: {
          type: TableColumnTypeEnum.STRING,
          element: 'cfcNome',
          header: 'CFC',
        },
      },
      data: [],
    };
  }

  private _initForm() {
    this.formClass = this._formBuilder.group({
      agenda: [{ value: '', disabled: true }],
      inicio: [{ value: '', disabled: true }],
      fim: [{ value: '', disabled: true }],
      cfc: [{ value: '', disabled: true }],
      instrutor: [{ value: '', disabled: true }],
      limiteParticipantes: [{ value: '', disabled: true }],
      permiteCancelamento: [{ value: '', disabled: true }],
      situacao: [{ value: '', disabled: true }],
      tipoAulaId: [{ value: '', disabled: true }],
      turno: [{ value: '', disabled: true }],
      intervalo: [{ value: '', disabled: true }],
    })
  }

  private _setById(): void {
    if (this._activatedRoute.snapshot.params.id) {
      this.schedule = this._activatedRoute.snapshot.data['schedule'][0];
      this._updateForm();
      this._createTable();
      this._cdr.detectChanges();
    }
  }

  private _updateForm(): void {
    const data = this.schedule ? moment(this.schedule.agenda).format('DD/MM/YYYY') : null;
    const inicio = this.schedule ? moment(this.schedule.agenda).format('HH:mm') : null;
    const fim = this.schedule ? moment(this.schedule.agendaFim).format('HH:mm') : null;
    this.formClass.get('agenda').setValue(data);
    this.formClass.get('inicio').setValue(inicio);
    this.formClass.get('fim').setValue(fim);
    this.formClass.get('cfc').setValue(this.schedule.cfcNome);
    this.formClass.get('instrutor').setValue(this.schedule.instrutorNome);
    this.formClass.get('limiteParticipantes').setValue(this.schedule.limiteParticipantes);
    this.formClass.get('permiteCancelamento').setValue(this.schedule.permiteCancelamento);
    this.formClass.get('situacao').setValue(this.schedule.situacao);
    this.formClass.get('tipoAulaId').setValue(this.schedule.tipoAgendamentoDescricao);
    this.formClass.get('turno').setValue(this.schedule.turno);
    //this.formClass.get('intervalo').setValue(intervalo);
  }
}
