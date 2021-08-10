import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ConfirmDialogComponent, ConfirmDialogInterface } from '@components/dialogs/confirm-dialog/confirm-dialog.component';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SchedulePracticalsModel } from '@models/agendamento-pratico/schedule-practicals.model';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { ButtonsMenuModel } from '@models/outros/buttons-menu.model';
import { ButtonsMenuEventsEnum } from '@enums/buttons-menu-events.enum';
import { CargaRenachModel } from '@core/models/gestao/carga-renach.model';
import { Helper } from '@utils/helper';
import { MatriculaService } from '@services/apis/gestao/matricula.service';
import { SchedulePraticalsRequestModel } from '@models/agendamento-pratico/schedule-practicals-request.model';
import { SchedulePracticalsService } from '@services/apis/agendamento-pratico/schedule-practicals.service';
import { Toast } from '@core/services/outros/toast.service';
import { VehicleAvailabilityCachesModel } from '@models/agendamento-pratico/vehicle-availability-caches.model';
@Component({
  selector: 'app-practical-scheduling',
  templateUrl: './practical-scheduling.component.html',
  styleUrls: ['./practical-scheduling.component.scss']
})
export class PracticalSchedulingComponent implements OnInit, OnChanges, AfterViewInit {

  @Output() exame = new EventEmitter<any>();
  @Output() showComponent = new EventEmitter<string>();
  @Input() agendaSelecionada: VehicleAvailabilityCachesModel;
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
  cargaRenach: CargaRenachModel = new CargaRenachModel();
  categories: string[] = ['A', 'B', 'C', 'D', 'E'];
  disabled: boolean = false;
  formRenach: FormControl = new FormControl('', Validators.required);
  form: FormGroup;
  rescheduleStatus: boolean = false;
  updateStatus: boolean = false;
  schedulePraticalRequest: SchedulePraticalsRequestModel = new SchedulePraticalsRequestModel();
  schedulePratical: SchedulePracticalsModel = new SchedulePracticalsModel();
  vehicleCache: VehicleAvailabilityCachesModel = new VehicleAvailabilityCachesModel();
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _matriculaService: MatriculaService,
    private _schedulePraticalService: SchedulePracticalsService,
    private _router: Router,
    private _toast: Toast,
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.agendaSelecionada && changes.agendaSelecionada.currentValue) {
      if (this.schedulePratical.id) {
        this._setValuesFromCalendarToNewLocal(changes.agendaSelecionada.currentValue);
      } else {
        this._setValuesFromCalendar(changes.agendaSelecionada.currentValue);
      }
    }
  }

  ngAfterViewInit(): void {
    this._setById();
  }

  buttonsActions(event: ButtonsMenuEventsEnum): void {
    if (event == ButtonsMenuEventsEnum.BACK) this._back();
    if (event == ButtonsMenuEventsEnum.CANCEL) this._changeEnableForm();
    if (event == ButtonsMenuEventsEnum.CREATE) this._create();
    if (event == ButtonsMenuEventsEnum.DELETE) this._delete();
    if (event == ButtonsMenuEventsEnum.EDIT) this._changeEnableForm();
    if (event == ButtonsMenuEventsEnum.UPDATE) this._update();
  }

  clear(): void {
    this.formRenach.setValue('');
    this.form.reset();
    this.schedulePraticalRequest = new SchedulePraticalsRequestModel();
    this.cargaRenach = new CargaRenachModel();
  }

  findCandidate(): void {
    this._matriculaService.getCargaRenach(`renach=${this.formRenach.value}`).subscribe(
      results => {
        this.cargaRenach = results
        this.form.get('aluno').setValue(results.candidato.nome);
        this.form.get('cpf').setValue(results.candidato.cpf);
      }
    )
  }

  reschedule(): void {
    this._updateReschedulleForm();
    this.rescheduleStatus = !this.rescheduleStatus;
    this.disabled = !this.disabled;
  }

  showCalendar(event): void {
    this.exame.emit(this.form.get('categoria').value);
    this.showComponent.emit('calendario');
    event.preventDefault();
    return;
  }

  private _back(): void {
    this._router.navigate([Helper.checkUrlBack(this._activatedRoute)], { relativeTo: this._activatedRoute });
  }

  private _changeEnableForm(): void {
    if (this.rescheduleStatus) {
      this.rescheduleStatus = !this.rescheduleStatus;
      this.disabled = !this.disabled;
      return;
    }
    this.updateStatus = !this.updateStatus;
    if (this.updateStatus) {
      this._updateReschedulleForm();
    }
    this.disabled = !this.disabled;
    this._cdr.detectChanges();
  }

  private _create(): void {
    this.schedulePraticalRequest.idInstructor = this.vehicleCache.idInstructor;
    this.schedulePraticalRequest.idOrganization = this.vehicleCache.idOrganization;
    this.schedulePraticalRequest.idStudentEnrollment = this.cargaRenach.candidato.id;
    this.schedulePraticalRequest.idVehicle = this.vehicleCache.idVehicle;
    this.schedulePraticalRequest.idVehicleAvailability = this.vehicleCache.idVehicleAvailability;
    this.schedulePraticalRequest.dateTime = Helper.formatDateUtc(this.form.get('data').value, this.form.get('horario').value);
    delete this.schedulePraticalRequest.createdByUsername;
    delete this.schedulePraticalRequest.createdDate;
    delete this.schedulePraticalRequest.enabled;
    delete this.schedulePraticalRequest.id;
    this._schedulePraticalService.create(this.schedulePraticalRequest).subscribe(
      () => {
        this._toast.success('Exame agendado com sucesso.', 'Agendamento de Exames')
        this.clear();
      }
    )
  }

  private _delete(): void {
    const dialogRef = this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
      data: {
        title: 'Cancelar Agendamento',
        subtitle: 'Ao excluir um agendamento ele será removido da base de dados. Esta é uma operação irreversível.',
        descriptionFirst: `Confirma a exclusão do agendamento para o veículo:`,
        descriptionSecond: this.schedulePratical.vehicle.licencePlate
      },
      width: '488px'
    });

    this._subscription.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this._schedulePraticalService.delete(this.schedulePratical.id).subscribe(
            () => {
              this._toast.success('Cancelar Agendamento', 'Agendamento removido com sucesso.');
              this._back();
            }
          )
        }
      })
    )
  }

  private _initForm(): void {
    this.form = this._formBuilder.group({
      aluno: [{ value: '', disabled: true }, Validators.required],
      categoria: ['', Validators.required],
      cpf: [{ value: '', disabled: true }, Validators.required],
      data: [{ value: '', disabled: true }, Validators.required],
      horario: [{ value: '', disabled: true }, Validators.required],
      instrutor: ['', Validators.required],
      renach: [{ value: '', disabled: true }, Validators.required, Validators.maxLength(11), Validators.minLength(11)],
      novaData: [{ value: '', disabled: true }],
      novoHorario: [{ value: '', disabled: true }],
      novoInstrutor: [''],
      novoVeiculo: [{ value: '', disabled: true }],
      veiculo: [{ value: '', disabled: true }, Validators.required],
    })
  }

  private _updateReschedulleForm(): void {
    this.form.get('novaData').setValue('');
    this.form.get('novoHorario').setValue('');
    this.form.get('novoVeiculo').setValue('');
    this.form.get('novoInstrutor').setValue('');
  }

  private _setValuesFromCalendar(exame: VehicleAvailabilityCachesModel): void {
    const data = moment(exame.date).format('DD/MM/YYYY');
    this.vehicleCache = exame;
    this.form.get('data').setValue(data);
    this.form.get('horario').setValue(exame.time);
    this.form.get('veiculo').setValue(exame.licencePlate);
    this.form.get('instrutor').setValue(exame.idInstructor);
    this._cdr.detectChanges();
  }

  private _setValuesFromCalendarToNewLocal(exame: VehicleAvailabilityCachesModel): void {
    const data = moment(exame.date).format('DD/MM/YYYY');
    this.vehicleCache = exame;
    this.form.get('novaData').setValue(data);
    this.form.get('novoHorario').setValue(exame.time);
    this.form.get('novoVeiculo').setValue(exame.licencePlate);
    this.form.get('novoInstrutor').setValue(exame.idInstructor)
    this._cdr.detectChanges();
  }

  private _setById(): void {
    if (this._activatedRoute.snapshot.params.id) {
      this.schedulePratical = this._activatedRoute.snapshot.data['schedule'];
      this.cargaRenach.candidatoId = this.schedulePratical.idStudentEnrollment;
      this._cdr.detectChanges();
      this._updateForm();
    }
  }

  private _update(): void {
    if (this.rescheduleStatus) {
      this._createReSchedulle();
    } else if (this.updateStatus) {
      this._updateSchedule();
    }
  }

  private _updateSchedule(): void {
    this.schedulePraticalRequest.id = this.schedulePratical.id;
    this.schedulePraticalRequest.idInstructor = this.vehicleCache.idInstructor;
    this.schedulePraticalRequest.idOrganization = this.vehicleCache.idOrganization;
    this.schedulePraticalRequest.idStudentEnrollment = this.cargaRenach.candidatoId;
    this.schedulePraticalRequest.idVehicle = this.vehicleCache.idVehicle;
    this.schedulePraticalRequest.idVehicleAvailability = this.vehicleCache.idVehicleAvailability;
    this.schedulePraticalRequest.dateTime = Helper.formatDateUtc(this.form.get('novaData').value, this.form.get('novoHorario').value);
    delete this.schedulePraticalRequest.createdByUsername;
    delete this.schedulePraticalRequest.createdDate;
    delete this.schedulePraticalRequest.enabled;
    this._schedulePraticalService.update(this.schedulePraticalRequest).subscribe(
      () => {
        this._toast.success('Exame agendado com sucesso.', 'Agendamento de Exames')
        this._back();
      }
    )
  }

  private _createReSchedulle(): void {
    this.schedulePraticalRequest.id = this.schedulePratical.id;
    this.schedulePraticalRequest.idInstructor = this.vehicleCache.idInstructor;
    this.schedulePraticalRequest.idOrganization = this.vehicleCache.idOrganization;
    this.schedulePraticalRequest.idStudentEnrollment = this.cargaRenach.candidatoId;
    this.schedulePraticalRequest.idVehicle = this.vehicleCache.idVehicle;
    this.schedulePraticalRequest.idVehicleAvailability = this.vehicleCache.idVehicleAvailability;
    this.schedulePraticalRequest.dateTime = Helper.formatDateUtc(this.form.get('novaData').value, this.form.get('novoHorario').value);
    delete this.schedulePraticalRequest.createdByUsername;
    delete this.schedulePraticalRequest.createdDate;
    delete this.schedulePraticalRequest.enabled;
    this._schedulePraticalService.update(this.schedulePraticalRequest).subscribe(
      () => {
        this._toast.success('Exame agendado com sucesso.', 'Agendamento de Exames')
        this._back();
      }
    )
  }

  private _updateForm(): void {
    const data = moment(this.schedulePratical.dateTime).format('DD/MM/YYYY');
    const time = moment(this.schedulePratical.dateTime).format('hh:mm');
    this.formRenach.setValue(this.schedulePratical.studentEnrollment.processNumber);
    this.formRenach.disable();
    this.form.get('aluno').setValue(this.schedulePratical.studentEnrollment.student.name);
    this.form.get('cpf').setValue(this.schedulePratical.studentEnrollment.student.socialCodeNumber);
    this.form.get('categoria').setValue(this.schedulePratical.vehicle.category);
    this.form.get('data').setValue(data);
    this.form.get('horario').setValue(time);
    this.form.get('veiculo').setValue(this.schedulePratical.vehicle.licencePlate);
    this.form.get('instrutor').setValue(this.schedulePratical.instructor.id);
    this.form.get('categoria').disable();
    this.form.get('instrutor').disable();
    this.form.get('novaData').setValidators(Validators.required);
    this.form.get('novoHorario').setValidators(Validators.required);
    this.form.get('novoVeiculo').setValidators(Validators.required);
    this.form.get('novoInstrutor').setValidators(Validators.required);
    this._cdr.detectChanges();
  }
}
