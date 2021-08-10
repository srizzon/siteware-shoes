import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { AvailabilityBlockingManagementPlacesComponent } from '../availability-blocking-management-places/availability-blocking-management-places.component';
import { ButtonsMenuModel } from '@models/outros/buttons-menu.model';
import { ButtonsMenuEventsEnum } from '@enums/buttons-menu-events.enum';
import { CLASS_SITUATION_EXAM } from '@constants/class-situation-exam.constants';
import { ConfirmDialogComponent, ConfirmDialogInterface } from '@components/dialogs/confirm-dialog/confirm-dialog.component';
import { ConstantModel } from '@core/models/outros/constant.model';
import { Helper } from '@core/utils/helper';
import { MarcacaoExameDisponibilidadeBloqueio } from '@models/gestao/marcacao-exame-bloqueio-disponibilidade.model';
import { MarcacaoExameDisponibilidadeService } from '@core/services/apis/gestao/marcacao-exame-disponibilidade.service';
import { MarcacaoExameDisponibilidadeBloqueioService } from '@core/services/apis/gestao/marcacao-exame-bloqueio-disponibilidade.service';
import { WeekdayEnum } from '@enums/weekday.enum';
import { SHIFT_MODEL } from '@constants/shift-model.constants';
import { Toast } from '@core/services/outros/toast.service';
import { WEEKDAY_MODEL } from '@constants/weekday-model.constants';
@Component({
  selector: 'app-availability-blocking-management-form',
  templateUrl: './availability-blocking-management-form.component.html',
  styleUrls: ['./availability-blocking-management-form.component.scss']
})
export class AvailabilityBlockingManagementFormComponent implements OnInit, OnDestroy, AfterViewInit {

  buttons: ButtonsMenuModel = new ButtonsMenuModel({
    back: true,
    create: true,
    delete: false,
    enable: true,
    propertyId: 'id',
    propertyActive: 'ativo',
    showButtons: true,
    update: true
  })
  classSituation = CLASS_SITUATION_EXAM;
  classShift = SHIFT_MODEL;
  classWeekDay = WEEKDAY_MODEL;
  disabled: boolean = true;
  form: FormGroup;
  locaisExames: ConstantModel[] = new Array<ConstantModel>();
  marcacaoExameDisponibilidadeBloqueio: MarcacaoExameDisponibilidadeBloqueio = new MarcacaoExameDisponibilidadeBloqueio();
  tiposExames: ConstantModel[] = new Array<ConstantModel>();
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _service: MarcacaoExameDisponibilidadeBloqueioService,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _toast: Toast,
    private _marcacaoExameDisponibilidadeService: MarcacaoExameDisponibilidadeService,
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._initForm();
  }

  ngAfterViewInit(): void {
    this._setEntityById();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  buttonsActions(event: ButtonsMenuEventsEnum): void {
    if (event == ButtonsMenuEventsEnum.BACK) this._back();
    if (event == ButtonsMenuEventsEnum.CANCEL) this._changeEnableForm();
    if (event == ButtonsMenuEventsEnum.CREATE) this._create();
    //if (event == ButtonsMenuEventsEnum.DELETE) this._delete();
    if (event == ButtonsMenuEventsEnum.ENABLE) this._enable();
    if (event == ButtonsMenuEventsEnum.EDIT) this._changeEnableForm();
    if (event == ButtonsMenuEventsEnum.UPDATE) this._update();
  }

  openPlaces() {
    const formValues = this.form.getRawValue();

    if (!formValues.locaisExames.id) {
      this._toast.info('Local deve ser informado!');
      return;
    }

    let idLocal = formValues.locaisExames.id;

    this._marcacaoExameDisponibilidadeService
      .getAll({ idLocal })
      .subscribe((res) => {
        this.openDialog(res)
      });
  }

  openDialog(res) {
    const dialogRef = this._dialog.open<AvailabilityBlockingManagementPlacesComponent>(AvailabilityBlockingManagementPlacesComponent, {
      data: res,
      width: '1280px',
    });
    this._subscription.add(
      dialogRef.afterClosed().subscribe(
        (res) => {
          if (res) {
            console.log(res);
            this.form.get('horario').setValue(res.id);
          }
        }
      )
    )
  }

  private _initForm(): void {
    this.form = this._formBuilder.group({
      ativo:            [{ value: '', disabled: true }],
      dataInicio:       [''],
      dataFim:          [''],
      domingo:          [''],
      horario:          [''],
      locaisExames:     [''],
      manha:            [''],
      noite:            [''],
      observacao:       ['', [Validators.required]],
      quarta:           [''],
      quinta:           [''],
      sabado:           [''],
      segunda:          [''],
      sexta:            [''],
      tarde:            [''],
      terca:            [''],
      tiposExames:      [''],
    })
  }

  private _updateEntityForm(): void {
    this.form.get('ativo').setValue(this.marcacaoExameDisponibilidadeBloqueio.ativo ? 'ATIVO' : 'INATIVO');
    this.form.get('observacao').setValue(this.marcacaoExameDisponibilidadeBloqueio.observacao);
    this.form.get('tiposExames').setValue(this.marcacaoExameDisponibilidadeBloqueio.exame);
    this.form.get('locaisExames').setValue(this.marcacaoExameDisponibilidadeBloqueio.local);
    this.form.get('horario').setValue(this.marcacaoExameDisponibilidadeBloqueio.idMarcacaoExameDisponibilidade);
    this._setWeekDay();
    this._setTurn();
  }

  private _back(): void {
    this._router.navigate([Helper.checkUrlBack(this._activatedRoute)], { relativeTo: this._activatedRoute });
  }

  private _changeEnableForm(): void {
    if (!this.disabled) {
      this.form.get('dataInicio').enable();
      this.form.get('dataFim').enable();
      this.form.get('domingo').enable();
      this.form.get('horario').enable();
      this.form.get('locaisExames').enable();
      this.form.get('manha').enable();
      this.form.get('noite').enable();
      this.form.get('observacao').enable();
      this.form.get('quarta').enable();
      this.form.get('quinta').enable();
      this.form.get('sabado').enable();
      this.form.get('segunda').enable();
      this.form.get('sexta').enable();
      this.form.get('tarde').enable();
      this.form.get('terca').enable();
      this.form.get('tiposExames').enable();
    } else {
      this.form.get('dataInicio').disable();
      this.form.get('dataFim').disable();
      this.form.get('domingo').disable();
      this.form.get('horario').disable();
      this.form.get('locaisExames').disable();
      this.form.get('manha').disable();
      this.form.get('noite').disable();
      this.form.get('observacao').disable();
      this.form.get('quarta').disable();
      this.form.get('quinta').disable();
      this.form.get('sabado').disable();
      this.form.get('segunda').disable();
      this.form.get('sexta').disable();
      this.form.get('tarde').disable();
      this.form.get('terca').disable();
      this.form.get('tiposExames').disable();
    }
    this.disabled = !this.disabled;
    this._cdr.detectChanges();
  }

  private _create() {
    const formValues = this.form.getRawValue();

    const payload = new MarcacaoExameDisponibilidadeBloqueio();
    payload.idExame = formValues.tiposExames.id;
    payload.idLocal = formValues.locaisExames.id;
    payload.diaSemana = this._getItens(['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo']);
    payload.turno = this._getItens(['manha', 'tarde', 'noite']);
    payload.observacao = formValues.observacao;
    payload.idMarcacaoExameDisponibilidade = formValues.horario;
    payload.dataInicio = formValues.dataInicio;
    payload.dataFim = formValues.dataFim;

    this._subscription.add(
      this._service.create(payload).subscribe(
        (res) => {
          this.marcacaoExameDisponibilidadeBloqueio = res;
          this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
            width: '500px',
            data: {
              title: 'Criação de Bloqueio de Disponibilidade',
              subtitle: `O Bloqueio de Disponiiblidade de Marcação de Exame foi criado com sucesso.`,
              onlyOkButton: true
            }
          });
        }
      )
    )
  }

  private _enable(): void {
    this.marcacaoExameDisponibilidadeBloqueio.ativo = !this.marcacaoExameDisponibilidadeBloqueio.ativo;
    this._subscription.add(
      this._service.update(this.marcacaoExameDisponibilidadeBloqueio).subscribe(
        (res) => {
          if (this.marcacaoExameDisponibilidadeBloqueio.ativo) {
            this._toast.success('Sucesso', 'Bloqueio de Marcação de Exame desabilitado com sucesso.');
          } else {
            this._toast.success('Sucesso', 'Bloqueio de Marcação de Exame habilitado com sucesso.');
          }
          this.marcacaoExameDisponibilidadeBloqueio = res;
          this._updateEntityForm();
        }
      )
    )
  }

  private _getItens(data: Array<any>): string {
    let items = [];
    data.forEach(x => {
      if (this.form.get(x).value) {
        items.push(WeekdayEnum[x])
      }
    })
    return items.length > 0 ? items.join(',') : '';
  }

  private _setEntityById() {
    if (this._activatedRoute.snapshot.params.id) {
      this.marcacaoExameDisponibilidadeBloqueio = this._activatedRoute.snapshot.data['disponibilidade'];
      this._updateEntityForm();
      this._changeEnableForm();
      this._cdr.detectChanges();
    }
  }

  private _setTurn() {
    const turns = this.marcacaoExameDisponibilidadeBloqueio.turno.split(',');
    turns.forEach(x => {
      switch (x) {
        case 'MANHA':
          this.form.get('manha').setValue(true)
          break;
        case 'TARDE':
          this.form.get('tarde').setValue(true)
          break;
        case 'NOITE':
          this.form.get('noite').setValue(true)
          break;
      }
    })
  }

  private _setWeekDay(): void {
    const days = this.marcacaoExameDisponibilidadeBloqueio.diaSemana.split(',');
    days.forEach(x => {
      switch (x) {
        case 'segunda-feira':
          this.form.get('segunda').setValue(true)
          break;
        case 'terça-feira':
          this.form.get('terca').setValue(true)
          break;
        case 'quarta-feira':
          this.form.get('quarta').setValue(true)
          break;
        case 'quinta-feira':
          this.form.get('quinta').setValue(true)
          break;
        case 'sexta-feira':
          this.form.get('sexta').setValue(true)
          break;
        case 'sabado':
          this.form.get('sabado').setValue(true)
          break;
        case 'domingo':
          this.form.get('domingo').setValue(true)
          break;
      }
    })
  }

  private _update() {
    const formValues = this.form.getRawValue();
    const payload = new MarcacaoExameDisponibilidadeBloqueio();
    payload.idExame = formValues.tiposExames.id;
    payload.idLocal = formValues.locaisExames.id;
    payload.diaSemana = this._getItens(['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo']);
    payload.turno = this._getItens(['manha', 'tarde', 'noite']);
    payload.observacao = formValues.observacao;
    payload.idMarcacaoExameDisponibilidade = formValues.horario;
    payload.dataInicio = formValues.dataInicio;
    payload.dataFim = formValues.dataFim;

    this._subscription.add(
      this._service.update(payload).subscribe(
        (res) => {
          this.marcacaoExameDisponibilidadeBloqueio = res;
          this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
            width: '500px',
            data: {
              title: 'Atualização de Bloqueio de Disponibilidade',
              subtitle: `O Bloqueio de Disponiiblidade de Marcação de Exame foi atualizado com sucesso.`,
              onlyOkButton: true
            }
          });
        }
      )
    )
  }
}
