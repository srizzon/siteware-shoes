import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { ButtonsMenuEventsEnum } from '@enums/buttons-menu-events.enum';
import { ButtonsMenuModel } from '@models/outros/buttons-menu.model';
import { ConfirmDialogComponent, ConfirmDialogInterface } from '@components/dialogs/confirm-dialog/confirm-dialog.component';
import { CfcAgendamentoModel } from '@models/agendamento/cfc-agendamento.model';
import { ConstantModel } from '@models/outros/constant.model';
import { CLASS_MODEL } from '@constants/class-model.constants';
import { GradeModel } from '@models/agendamento/grade.model';
import { GradesService } from '@services/apis/agendamento/grades.service';
import { InstrutorAgendamentoModel } from '@models/agendamento/instrutor-agendamento.model';
import { Helper } from '@utils/helper';
import { GradeServicoService } from '@services/apis/agendamento/grade-servico.service';
import { GradeServicoModel } from '@models/agendamento/grade-servico.model';
import { SITUATIONS } from '@constants/situation.constants';
import { Toast } from '@services/outros/toast.service';
import { ServicoAgendamentoModel } from '@models/agendamento/servico-agendamento.model';

export interface GridForm {
  cfcCnpj: CfcAgendamentoModel;
  dataInicio: string;
  descricao: string;
  id: number;
  instrutorCpf: InstrutorAgendamentoModel;
  modelo: ConstantModel;
  qtdMaximoParticipantes: number;
  servicoId: ServicoAgendamentoModel;
  gradeServicoId: number;
  situacao: ConstantModel;
  turno: string;
  indicadorDiasUteis: boolean;
}

@Component({
  templateUrl: './grid-form.component.html',
  styleUrls: ['./grid-form.component.scss'],
})
export class GridFormComponent implements OnInit, OnDestroy, AfterViewInit {

  buttons: ButtonsMenuModel = new ButtonsMenuModel({
    back: true,
    create: true,
    delete: true,
    enable: false,
    propertyId: 'id',
    showButtons: true,
    update: true
  });

  autoTicks = false;
  classDays = [];
  classModel = CLASS_MODEL;
  disabled: boolean = true;
  form: FormGroup;
  grid: GradeModel = new GradeModel();
  helper;
  id: number;
  maxQuantityClass: number = 100;
  servicesGrids: GradeServicoModel[];
  situations = SITUATIONS;
  startDay: any;
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _gradeServicoService: GradeServicoService,
    private _gradesService: GradesService,
    private _router: Router,
    private _toast: Toast
  ) {
    this._subscription = new Subscription();
    this.helper = Helper;
  }

  ngOnInit(): void {
    this._initForm();
  }

  ngAfterViewInit(): void {
    this._setDataById();
    this._changeQuantityClass();

  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  buttonsActions(event: ButtonsMenuEventsEnum): void {
    if (event == ButtonsMenuEventsEnum.BACK) this._back();
    if (event == ButtonsMenuEventsEnum.CANCEL) this._changeEnableForm();
    if (event == ButtonsMenuEventsEnum.CREATE) this._create();
    if (event == ButtonsMenuEventsEnum.DELETE) this._delete();
    if (event == ButtonsMenuEventsEnum.EDIT) this._changeEnableForm();
    if (event == ButtonsMenuEventsEnum.UPDATE) this._update();
  }

  shiftChange(e) {
    const values: GridForm = this.form.getRawValue();
    this._subscription.add(
      this._gradeServicoService
        .getAllServicesGrid({ idExterno: values.servicoId.idExterno, turno: e.value })
        .subscribe((res) => {
          this.servicesGrids = <GradeServicoModel[]>res;
        })
    )
  }

  selectDate(selectedDay, daysForConclusion) {
    this.startDay = selectedDay;
    this.classDays = [];
    this.setDaysClass(selectedDay, daysForConclusion);
  }

  setDaysClass(selectedDay, daysForConclusion) {
    if (this.classDays.length < daysForConclusion) {
      const date = moment(selectedDay).format('yyyy/MM/DD');
      if (!this.form.get('indicadorDiasUteis').value) {
        this.classDays.push(date);
      } else if (!this.isWeekend(date)) {
        this.classDays.push(date);
      }
      this.setDaysClass(moment(selectedDay).add(1, 'd'), daysForConclusion);
    }
  }

  isWeekend = (date) => {
    let dt = new Date(date);
    return dt.getDay() == 6 || dt.getDay() == 0;
  };

  private _create(): void {
    const values: GridForm = this.form.getRawValue();
    const dataInicial = moment(values.dataInicio).format('DD/MM/YYYY');
    const dataFinal = moment(new Date(this.classDays[this.classDays.length - 1])).format('DD/MM/YYYY');
    let payload: GradeModel = new GradeModel();

    payload.cfcId = values.cfcCnpj.id;
    payload.dataInicio = Helper.formatDateUtc(dataInicial, '00:00:00');
    payload.dataTermino = Helper.formatDateUtc(dataFinal, '00:00:00');
    payload.descricao = values.descricao;
    payload.gradeServicoId = values.gradeServicoId;
    payload.servicoId = Number(values.servicoId.idExterno);
    payload.indicadorDiasUteis = values.indicadorDiasUteis;
    payload.instrutorCpf = values.instrutorCpf.instrutorCpf;
    payload.instrutorId = values.instrutorCpf.instrutorId;
    payload.modelo = values.modelo;
    payload.qtdMaximoParticipantes = values.qtdMaximoParticipantes;
    payload.qtdVagasDisponiveis = values.qtdMaximoParticipantes;
    payload.situacao = values.situacao;
    payload.turno = values.turno;

    this._gradesService.create(payload).subscribe(
      () => {
        this._toast.success('Grade');
        this._back()
      }
    )
  }

  private _delete(): void {
    const dialogRef = this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
      data: {
        title: 'Remover Grade',
        subtitle: `Tem certeza que deseja remover a grade: ${this.grid.descricao}?`,
      },
    });

    this._subscription.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this._gradesService.delete(this.grid.id).subscribe(
            () => {
              this._toast.success('Remover Grade');
              this._back()
            }
          );
        }
      })
    )
  }

  private _initForm(): void {
    this.form = this._formBuilder.group({
      id: [''],
      cfcCnpj: ['', Validators.required],
      dataInicio: ['', Validators.required],
      descricao: ['', Validators.required],
      instrutorCpf: ['', Validators.required],
      modelo: ['', Validators.required],
      qtdMaximoParticipantes: ['', Validators.required],
      servicoId: ['', Validators.required],
      gradeServicoId: ['', Validators.required],
      situacao: ['', Validators.required],
      turno: ['', Validators.required],
      indicadorDiasUteis: [],
    });

  }

  private _update(): void {
    const values: GridForm = this.form.getRawValue();
    const dataInicial = moment(values.dataInicio).format('DD/MM/YYYY');
    const dataFinal = moment(values.dataInicio).add(this.servicesGrids.find((c) => c.id === values.gradeServicoId).qtdDiasPrevistoConclusao - 1, 'd').format('DD/MM/YYYY');
    let payload: GradeModel = new GradeModel();

    payload.cfcId = values.cfcCnpj.id;
    payload.dataInicio = Helper.formatDateUtc(dataInicial, '00:00:00');
    payload.dataTermino = Helper.formatDateUtc(dataFinal, '00:00:00');
    payload.descricao = values.descricao;
    payload.gradeServicoId = values.gradeServicoId;
    payload.servicoId = Number(values.servicoId.idExterno);
    payload.id = this.grid.id;
    payload.indicadorDiasUteis = values.indicadorDiasUteis;
    payload.instrutorCpf = values.instrutorCpf.instrutorCpf;
    payload.instrutorId = values.instrutorCpf.instrutorId;
    payload.modelo = values.modelo;
    payload.qtdMaximoParticipantes = values.qtdMaximoParticipantes;
    payload.qtdVagasDisponiveis = values.qtdMaximoParticipantes;
    payload.situacao = values.situacao;
    payload.turno = values.turno;

    this._gradesService.update(payload).subscribe(
      () => {
        this._toast.success('Grade');
        this._back()
      }
    )
  }

  private _updateForm() {
    this.form.get('cfcCnpj').setValue(this.grid.cfcId);
    this.form.get('dataInicio').setValue(this.grid.dataInicio);
    this.form.get('descricao').setValue(this.grid.descricao);
    this.form.get('id').setValue(this.grid.id);
    this.form.get('indicadorDiasUteis').setValue(this.grid.indicadorDiasUteis);
    this.form.get('instrutorCpf').setValue(this.grid.instrutorId);
    this.form.get('gradeServicoId').setValue(this.grid.gradeServicoId);
    this.form.get('modelo').setValue(this.grid.modelo);
    this.form.get('qtdMaximoParticipantes').setValue(this.grid.qtdMaximoParticipantes);
    this.form.get('servicoId').setValue(this.grid.servicoId);
    this.form.get('situacao').setValue(this.grid.situacao);
    this.form.get('turno').setValue(this.grid.turno);
    this.selectDate(
      this.grid.dataInicio,
      this.grid.gradeServicoQtdDiasPrevistoConclusao);
    this.shiftChange({ value: this.grid.turno });
  }

  private _back(): void {
    this._router.navigate([Helper.checkUrlBack(this._activatedRoute)], { relativeTo: this._activatedRoute });
  }

  private _changeEnableForm(): void {
    if (!this.disabled) {
      this.form.enable();
    } else {
      this.form.disable();
    }
    this.disabled = !this.disabled;
    this._cdr.detectChanges();
  }


  private _changeQuantityClass(): void {
    this.form.get('modelo').valueChanges.subscribe(
      (res: ConstantModel) => {
        if (res === 'INDIVIDUAL') {
          this.maxQuantityClass = 35;
          this.form.get('qtdMaximoParticipantes').setValue(35);
        } else if (res === 'COMPARTILHADO') {
          this.maxQuantityClass = 60;
          this.form.get('qtdMaximoParticipantes').setValue(60);
        }
      }
    )
  }

  private _setDataById(): void {
    if (this._activatedRoute.snapshot.params.id) {
      this.grid = this._activatedRoute.snapshot.data['grade'];
      this._updateForm();
      this._changeEnableForm();
      this._cdr.detectChanges();
    } else {
      this.form.get('situacao').setValue('EM_ABERTO');
      this._cdr.detectChanges();
    }
  }
}
