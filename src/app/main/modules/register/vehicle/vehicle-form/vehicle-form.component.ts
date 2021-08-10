import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ButtonsMenuEventsEnum } from '@enums/buttons-menu-events.enum';
import { ButtonsMenuModel } from '@models/outros/buttons-menu.model';
import { ConfirmDialogComponent, ConfirmDialogInterface } from '@components/dialogs/confirm-dialog/confirm-dialog.component';
import { Helper } from '@utils/helper';
import { Toast } from '@services/outros/toast.service';
import { VeiculoModel } from '@models/gestao/veiculo.model';
import { VehicleService } from '@services/apis/agendamento-pratico/vehicles.service';
@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit, AfterViewInit, OnDestroy {

  buttons: ButtonsMenuModel = new ButtonsMenuModel({
    back: true,
    create: true,
    delete: true,
    enable: true,
    propertyId: 'id',
    showButtons: true,
    update: true
  })

  disabled: boolean = true;
  vehicle: VeiculoModel = new VeiculoModel();
  form: FormGroup;
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _toast: Toast,
    private _service: VehicleService
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._initForm();
  }

  ngAfterViewInit(): void {
    this._setById();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

  buttonsActions(event: ButtonsMenuEventsEnum): void {
    if (event == ButtonsMenuEventsEnum.BACK) this._back();
    if (event == ButtonsMenuEventsEnum.CANCEL) this._changeEnableForm();
    if (event == ButtonsMenuEventsEnum.CREATE) this._create();
    if (event == ButtonsMenuEventsEnum.DELETE) this._delete();
    if (event == ButtonsMenuEventsEnum.EDIT) this._changeEnableForm();
    if (event == ButtonsMenuEventsEnum.UPDATE) this._update();
  }

  private _back(): void {
    this._router.navigate([Helper.checkUrlBack(this._activatedRoute)], { relativeTo: this._activatedRoute });
  }

  private _changeEnableForm(): void {
    if (!this.disabled) {
      this.form.get('categoria').enable();
      this.form.get('placa').enable();
    } else {
      this.form.get('categoria').disable();
      this.form.get('placa').disable();
    }
    this.disabled = !this.disabled;
    this._cdr.detectChanges();
  }

  private _create(): void {
    let payload: VeiculoModel = this.form.getRawValue();
    this._subscription.add(
      this._service.create(payload).subscribe(
        (res) => {
          this._toast.success('Sucesso', 'Veículo adicionado com sucesso.');
          this.vehicle = res;
          this.disabled = true;
          this._changeEnableForm();
        }
      )
    )
  }

  private _delete(): void {
    const dialogRef = this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
      data: {
        title: 'Deletar Veículo',
        subtitle: 'Ao excluir um veículo ele será removido da base de dados. Esta é uma operação irreversível.',
        descriptionFirst: 'Confirma a exclusão do veículo:',
        descriptionSecond: this.vehicle.placa
      },
      width: '488px'
    });

    this._subscription.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this._service.delete(this.vehicle.id).subscribe(
            () => {
              this._toast.success('Deletar Veículo', 'Veículo removido com sucesso.');
              this._back();
            }
          )
        }
      })
    )
  }

  private _initForm() {
    this.form = this._formBuilder.group({
      id: [{ value: '', disabled: true }],
      categoria: ['', Validators.required],
      dataAlteracao: [{ value: '', disabled: true }],
      dataCadastro: [{ value: '', disabled: true }],
      ativo: [{ value: '', disabled: true }],
      placa: ['', Validators.required],
      usuarioAlteracao: [{ value: '', disabled: true }],
      usuarioCadastro: [{ value: '', disabled: true }],
    })
  }

  private _setById(): void {
    if (this._activatedRoute.snapshot.params.id) {
      this.vehicle = this._activatedRoute.snapshot.data['vehicle'][0];
      this._updateForm();
      this._changeEnableForm();
      this._cdr.detectChanges();
    }
  }

  private _update(): void {
    let payload: VeiculoModel = this.form.getRawValue();
    this._subscription.add(
      this._service.update(payload).subscribe(
        (res) => {
          this._toast.success('Sucesso', 'Veículo salvo com sucesso.');
          this.vehicle = res;
          this.disabled = true;
          this._changeEnableForm();
        }
      )
    )
  }

  private _updateForm(): void {
    this.form.get('ativo').setValue(this.vehicle.ativo ? 'ATIVO' : 'INATIVO');
    this.form.get('id').setValue(this.vehicle.id);
    this.form.get('categoria').setValue(this.vehicle.categoria);
    this.form.get('dataCadastro').setValue(this.vehicle.dataCadastro);
    this.form.get('dataAlteracao').setValue(this.vehicle.dataAlteracao);
    this.form.get('placa').setValue(this.vehicle.placa);
    this.form.get('usuarioAlteracao').setValue(this.vehicle.usuarioAlteracao);
    this.form.get('usuarioCadastro').setValue(this.vehicle.usuarioCadastro);
  }
}
