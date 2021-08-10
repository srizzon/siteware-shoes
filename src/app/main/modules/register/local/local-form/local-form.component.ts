import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ButtonsMenuEventsEnum } from '@enums/buttons-menu-events.enum';
import { ButtonsMenuModel } from '@models/outros/buttons-menu.model';
import { ConfirmDialogComponent, ConfirmDialogInterface } from '@components/dialogs/confirm-dialog/confirm-dialog.component';
import { Helper } from '@utils/helper';
import { LocalModel } from '@models/gestao/local.model';
import { LocalService } from '@services/apis/gestao/local.service';
import { Subscription } from 'rxjs';
import { Toast } from '@services/outros/toast.service';

@Component({
  selector: 'app-local-form',
  templateUrl: './local-form.component.html',
  styleUrls: ['./local-form.component.scss']
})
export class LocalFormComponent implements OnInit, AfterViewInit, OnDestroy {

  buttons: ButtonsMenuModel = new ButtonsMenuModel({
    back: true,
    create: true,
    delete: true,
    enable: true,
    propertyId: 'id',
    propertyActive: 'ativo',
    showButtons: true,
    update: true
  })

  disabled: boolean = true;
  local: LocalModel = new LocalModel();
  form: FormGroup;
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _toast: Toast,
    private _localService: LocalService
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
    if (event == ButtonsMenuEventsEnum.ENABLE) this._enable();
    if (event == ButtonsMenuEventsEnum.UPDATE) this._update();
  }

  private _changeEnableForm(): void {
    if (!this.disabled) {
      this.form.get('codigoLocalDetran').enable();
      this.form.get('descricao').enable();
      this.form.get('idUnidadeDetran').enable();
    } else {
      this.form.get('codigoLocalDetran').disable();
      this.form.get('descricao').disable();
      this.form.get('idUnidadeDetran').disable();
    }
    this.disabled = !this.disabled;
    this._cdr.detectChanges();
  }

  private _back(): void {
    this._router.navigate([Helper.checkUrlBack(this._activatedRoute)], { relativeTo: this._activatedRoute });
  }

  private _create(): void {
    let payload: LocalModel = this.form.getRawValue();
    this._subscription.add(
      this._localService.create(payload).subscribe(
        (res) => {
          this._toast.success('Sucesso', 'Local adicionado com sucesso.');
          this.local = res;
          this.disabled = true;
          this._changeEnableForm();
          this._updateForm()
        }
      )
    )
  }

  private _delete(): void {
    const dialogRef = this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
      data: {
        title: 'Deletar Local',
        subtitle: 'Ao excluir um local ele será removido da base de dados. Esta é uma operação irreversível.',
        descriptionFirst: 'Confirma a exclusão do local:',
        descriptionSecond: this.local.codigoLocalDetran
      },
      width: '488px'
    });

    this._subscription.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this._localService.delete(this.local.id).subscribe(
            () => {
              this._toast.success('Deletar Local', 'Local removido com sucesso.');
              this._back();
            }
          )
        }
      })
    )
  }

  private _enable(): void {
    this.local.ativo = !this.local.ativo;
    this._subscription.add(
      this._localService.update(this.local).subscribe(
        (res) => {
          if (this.local.ativo) {
            this._toast.success('Sucesso', 'Local habilitado com sucesso.');
          } else {
            this._toast.success('Sucesso', 'Local desabilitado com sucesso.');
          }
          this.local = res;
          this._updateForm();
        }
      )
    )
  }

  private _initForm() {
    this.form = this._formBuilder.group({
      ativo: [{ value: '', disabled: true }],
      id: [''],
      codigoLocalDetran: ['', Validators.required],
      dataAlteracao: [{ value: '', disabled: true }],
      dataCadastro: [{ value: '', disabled: true }],
      descricao: ['', Validators.required],
      idUnidadeDetran: ['', Validators.required],
      usuarioAlteracao: [{ value: '', disabled: true }],
      usuarioCadastro: [{ value: '', disabled: true }],
    })
  }

  private _setById(): void {
    if (this._activatedRoute.snapshot.params.id) {
      this.local = this._activatedRoute.snapshot.data['local'];
      this._updateForm();
      this._changeEnableForm();
      this._cdr.detectChanges();
    }
  }

  private _update(): void {
    let payload: LocalModel = this.form.getRawValue();
    this._subscription.add(
      this._localService.update(payload).subscribe(
        (res) => {
          this._toast.success('Sucesso', 'Local salvo com sucesso.');
          this.local = res;
          this.disabled = true;
          this._changeEnableForm();
        }
      )
    )
  }

  private _updateForm(): void {
    this.form.get('ativo').setValue(this.local.ativo ? 'ATIVO' : 'INATIVO');
    this.form.get('id').setValue(this.local.id);
    this.form.get('codigoLocalDetran').setValue(this.local.codigoLocalDetran);
    this.form.get('dataAlteracao').setValue(this.local.dataAlteracao);
    this.form.get('dataCadastro').setValue(this.local.dataCadastro);
    this.form.get('descricao').setValue(this.local.descricao);
    this.form.get('idUnidadeDetran').setValue(this.local.idUnidadeDetran);
    this.form.get('usuarioAlteracao').setValue(this.local.usuarioAlteracao);
    this.form.get('usuarioCadastro').setValue(this.local.usuarioCadastro);
  }
}
