import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ButtonsMenuEventsEnum } from '@enums/buttons-menu-events.enum';
import { ButtonsMenuModel } from '@models/outros/buttons-menu.model';
import { CargaRenachModel } from '@models/gestao/carga-renach.model';
import { ConfirmCommentsDialogComponent, ConfirmCommentsDialogInterface } from '@components/dialogs/confirm-comments-dialog/confirm-comments-dialog.component';
import { ConstantModel } from '@models/outros/constant.model';
import { Helper } from '@utils/helper';
import { AgendamentoModel } from '@models/agendamento/agendamento.model';
import { MarcacaoExameDisponibilidadeCache } from '@models/gestao/marcacao-exame-disponibilidade-cache.model';
import { MarcacaoExameHorarioModel } from '@core/models/gestao/marcacao-exame-horario.model';
import { MarcacaoExameModel } from '@models/gestao/marcacao-exame.model';
import { MarcacaoExameRequestModel } from '@models/gestao/marcacao-exame-request-model';
import { MatriculaService } from '@services/apis/gestao/matricula.service';
import { MarcacaoExameService } from '@services/apis/gestao/marcacao-exames.service';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { Toast } from '@services/outros/toast.service';
import * as moment from 'moment';


@Component({
  selector: 'app-scheduling-exames',
  templateUrl: './scheduling-exams.component.html',
  styleUrls: ['./scheduling-exams.component.scss']
})
export class SchedulingExamsComponent implements OnInit, AfterViewInit {

  @Output() exame = new EventEmitter<any>();
  @Output() showComponent = new EventEmitter<string>();
  @Input() agendaSelecionada: MarcacaoExameDisponibilidadeCache;
  agendamentoSelecionado: AgendamentoModel = new AgendamentoModel();
  buttons: ButtonsMenuModel = new ButtonsMenuModel({
    back: true,
    create: true,
    delete: false,
    enable: false,
    propertyId: 'id',
    propertyActive: 'ativo',
    showButtons: true,
    update: false,
  })
  cargaRenach: CargaRenachModel = new CargaRenachModel();
  disabled: boolean = true;
  form: FormGroup;
  formRenach: FormControl = new FormControl('', Validators.required);
  marcacaoExame: MarcacaoExameModel = new MarcacaoExameModel();
  marcacaoExameRequest: MarcacaoExameRequestModel = new MarcacaoExameRequestModel();
  marcacaoExameHorario: MarcacaoExameHorarioModel = new MarcacaoExameHorarioModel();
  rescheduleStatus: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _matriculaService: MatriculaService,
    private _marcacaoExameService: MarcacaoExameService,
    private _router: Router,
    private _toast: Toast,
  ) { }

  ngOnInit(): void {
    this._initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.agendaSelecionada && changes.agendaSelecionada.currentValue) {
      if (this.marcacaoExame.id) {
        this._setValuesFromCalendarToNewLocal(changes.agendaSelecionada.currentValue);
      } else {
        this._setValuesFromCalendar(changes.agendaSelecionada.currentValue);
      }
    }
  }

  ngAfterViewInit(): void {
    this._setDataById();
    this._observSelectExam();
  }

  buttonsActions(event: ButtonsMenuEventsEnum): void {
    if (event == ButtonsMenuEventsEnum.BACK) this._back();
    if (event == ButtonsMenuEventsEnum.CREATE) this._create();
  }

  buscarCandidato() {
    this._matriculaService.getCargaRenach(`renach=${this.formRenach.value}`).subscribe(
      results => {
        this.cargaRenach = results;
        this.marcacaoExame.candidatoId = results.candidatoId;
        this.marcacaoExame.cfcId = results.cfcId;
        this.marcacaoExame.usuarioCadastro = results.usuarioCadastro;
        this.marcacaoExame.matriculaId = results.id;
        this.form.get('aluno').setValue(this.cargaRenach.candidato.nome);
        this.form.get('cpf').setValue(this.cargaRenach.candidato.cpf);
      }
    )
  }

  clear(): void {
    this.formRenach.setValue('');
    this.form.get('aluno').setValue('');
    this.form.get('cpf').setValue('');
    this.form.get('data').setValue('');
    this.form.get('horario').setValue('');
    this.form.get('instrutor').setValue('');
    this.form.get('local').setValue('');
    this.form.get('novoLocal').setValue('');
    this.form.get('novoHorario').setValue('');
    this.form.get('novaData').setValue('');
    this.form.get('renach').setValue('');
    this.form.get('situacao').setValue('');
    this.form.get('tipoSolicitacao').setValue('');
    this.form.get('veiculo').setValue('');
    this.marcacaoExame = new MarcacaoExameRequestModel();
    this.cargaRenach = new CargaRenachModel();
    this.marcacaoExameRequest = new MarcacaoExameRequestModel();
    this.marcacaoExameHorario = new MarcacaoExameHorarioModel();
    this.rescheduleStatus = false;

  }

  delete() {
    const dialogRef = this._dialog.open<ConfirmCommentsDialogComponent, ConfirmCommentsDialogInterface>(ConfirmCommentsDialogComponent, {
      data: {
        title: 'Cancelar Marcação de Exame',
        text: `Informe o motivo do cancelamento para o exame: ${moment(this.marcacaoExame.dataHora).format('DD/MM/YYYY HH:mm')} - ${this.marcacaoExame.candidatoNome} `,
        comments: '',
      },
      width: '600px',
      minHeight: '330px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._marcacaoExameService.cancel(this.marcacaoExame.id, result.comments)
          .subscribe(
            () => {
              this._toast.success('Cancelar exame', 'Marcação de exame cancelada com sucesso.')
              this._back();
            })
      }
    });
  }


  exibirCalendario(event) {
    this.exame.emit(this.form.get('tipoSolicitacao').value);
    this.showComponent.emit('calendario');
    event.preventDefault();
    return;
  }

  reschedule() {
    const payload = new MarcacaoExameRequestModel();
    payload.candidatoId = this.marcacaoExame.candidatoId;
    payload.cfcId = this.marcacaoExame.cfcId;
    payload.dataHora = Helper.formatDateUtc(this.form.get('novaData').value, this.form.get('novoHorario').value);
    payload.exameId = this.marcacaoExameHorario.idExame;
    payload.idMarcacaoExame = this.marcacaoExame.id;
    payload.localExameId = this.marcacaoExameHorario.idLocal;
    payload.marcacaoDisponibilidadeId = this.marcacaoExameHorario.marcacaoExameDisponibilidadeId;
    payload.matriculaId = this.marcacaoExame.matriculaId;
    if (this.form.get('tipoSolicitacao').value.id != 1) {
      payload.veiculoId = this.form.get('veiculo').value.veiculoId;
      payload.instrutorId = this.form.get('instrutor').value.instrutorId;
    }
    this._marcacaoExameService.create(payload).subscribe(
      () => {
        this._toast.success('Exame reagendado com sucesso.', 'Agendamento de Exames')
        this._back();
      }
    )
  }

  private _back(): void {
    this._router.navigate([`${ROUTES_APLICATION.management.path}/${ROUTES_APLICATION.management.schedulingExams}/${ROUTES_APLICATION.management.report}`]);
  }

  private _cleanSome(): void {
    this.form.get('data').setValue('');
    this.form.get('horario').setValue('');
    this.form.get('local').setValue('');
    this.form.get('veiculo').setValue('');
    this.form.get('instrutor').setValue('');
  }

  private _create(): void {
    const payload = new MarcacaoExameRequestModel();
    payload.candidatoId = this.marcacaoExame.candidatoId;
    payload.cfcId = this.marcacaoExame.cfcId;
    payload.dataHora = Helper.formatDateUtc(this.form.get('data').value, this.form.get('horario').value);
    payload.exameId = this.marcacaoExameHorario.idExame;
    payload.localExameId = this.marcacaoExameHorario.idLocal;
    payload.marcacaoDisponibilidadeId = this.marcacaoExameHorario.marcacaoExameDisponibilidadeId;
    payload.matriculaId = this.marcacaoExame.matriculaId;
    if (this.form.get('tipoSolicitacao').value.id != 1) {
      payload.veiculoId = this.form.get('veiculo').value.veiculoId;
      payload.instrutorId = this.form.get('instrutor').value.instrutorId;
    }

    this._marcacaoExameService.create(payload).subscribe(
      () => {
        this._toast.success('Exame agendado com sucesso.', 'Agendamento de Exames')
        this._back();
      }
    )
  }

  private _initForm(): void {
    this.form = this._formBuilder.group({
      aluno: [{ value: '', disabled: true }, Validators.required],
      cpf: [{ value: '', disabled: true }, Validators.required],
      data: ['', Validators.required],
      horario: ['', Validators.required],
      instrutor: [''],
      local: ['', Validators.required],
      novoLocal: [''],
      novoHorario: [''],
      novaData: [''],
      renach: [{ value: '', disabled: true }, Validators.required, Validators.maxLength(11), Validators.minLength(11)],
      situacao: [{ value: '', disabled: true }],
      tipoSolicitacao: ['', Validators.required],
      veiculo: [''],
    });

    if (this._activatedRoute.snapshot.params.id) {
      this.form.get('novoLocal').setValidators(Validators.required);
      this.form.get('novoHorario').setValidators(Validators.required);
      this.form.get('novaData').setValidators(Validators.required);
    }
  }

  private _observSelectExam() {
    this.form.get('tipoSolicitacao').valueChanges.subscribe(
      (res: ConstantModel) => {
        this._cleanSome();
      }
    )
  }

  private _setValuesFromCalendar(horario: MarcacaoExameHorarioModel) {
    this.form.get('data').setValue(moment(horario.data).format('DD/MM/YYYY'));
    this.form.get('horario').setValue(horario.hora);
    this.form.get('local').setValue(horario.local);
    this.marcacaoExameHorario = horario;
  }

  private _setValuesFromCalendarToNewLocal(horario: MarcacaoExameHorarioModel) {
    this.form.get('novaData').setValue(moment(horario.data).format('DD/MM/YYYY'));
    this.form.get('novoHorario').setValue(horario.hora);
    this.form.get('novoLocal').setValue(horario.local);
    this.marcacaoExameHorario = horario;
  }

  private _setDataById(): void {
    if (this._activatedRoute.snapshot.params.id) {
      this.marcacaoExame = this._activatedRoute.snapshot.data['exame'][0];
      this.rescheduleStatus = true;
      this._updateForm();
      this._cdr.detectChanges();
    }
  }

  private _updateForm(): void {
    this.formRenach.setValue(this.marcacaoExame.matriculaProcessoRenach);
    this.form.get('aluno').setValue(this.marcacaoExame.candidatoNome);
    this.form.get('cpf').setValue(this.marcacaoExame.candidatoCpf);
    this.form.get('data').setValue(moment(this.marcacaoExame?.dataHora).format('DD/MM/YYYY'));
    this.form.get('horario').setValue(moment(this.marcacaoExame?.dataHora).format('HH:mm'));
    this.form.get('local').setValue(this.marcacaoExame.localDescricao);
    this.form.get('tipoSolicitacao').setValue(this.marcacaoExame.exameId);
    this.form.get('renach').setValue(this.marcacaoExame.matriculaProcessoRenach);
    this.form.get('situacao').setValue(this.marcacaoExame.situacao);
    if (this.marcacaoExame.instrutorId) this.form.get('instrutor').setValue(this.marcacaoExame.instrutorId);
    if (this.marcacaoExame.veiculoId) this.form.get('veiculo').setValue(this.marcacaoExame.veiculoId);
    this.form.get('tipoSolicitacao').disable();
    this._cdr.detectChanges();
  }
}
