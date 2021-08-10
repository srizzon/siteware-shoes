import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { ButtonsMenuEventsEnum } from '@enums/buttons-menu-events.enum';
import { ButtonsMenuModel } from '@models/outros/buttons-menu.model';
import { ConfirmDialogComponent, ConfirmDialogInterface } from '@components/dialogs/confirm-dialog/confirm-dialog.component';
import { Helper } from '@utils/helper';
import { Toast } from '@services/outros/toast.service';
import { TYPE_USER } from '@constants/type-user.constants';
import { UsuarioService } from '@services/apis/identidade/usuario.service';
import { UsuarioIdentidadeModel } from '@models/identidade/usuario-identidade.model';
import * as moment from 'moment';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, AfterViewInit, OnDestroy {

  buttons: ButtonsMenuModel = new ButtonsMenuModel({
    back: true,
    create: true,
    delete: true,
    enable: true,
    propertyId: 'id',
    propertyActive: 'active',
    showButtons: true,
    update: true
  })

  disabled: boolean = true;
  user: UsuarioIdentidadeModel = new UsuarioIdentidadeModel();
  form: FormGroup;
  typeUser = TYPE_USER;
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _toast: Toast,
    private _userService: UsuarioService
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
    if (event == ButtonsMenuEventsEnum.ENABLE) this._enable();
    if (event == ButtonsMenuEventsEnum.EDIT) this._changeEnableForm();
    if (event == ButtonsMenuEventsEnum.UPDATE) this._update();
  }

  private _changeEnableForm(): void {
    if (!this.disabled) {
      this.form.get('name').enable();
      this.form.get('username').enable();
      this.form.get('email').enable();
      this.form.get('organizationCNPJ').enable();
      this.form.get('type').enable();
      this.form.get('id').enable();
    } else {
      this.form.get('name').disable();
      this.form.get('username').disable();
      this.form.get('email').disable();
      this.form.get('organizationCNPJ').disable();
      this.form.get('type').disable();
      this.form.get('id').disable();
    }
    this.disabled = !this.disabled;
    this._cdr.detectChanges();
  }

  private _back(): void {
    this._router.navigate([Helper.checkUrlBack(this._activatedRoute)], { relativeTo: this._activatedRoute });
  }

  private _create(): void {
    let user: UsuarioIdentidadeModel = this.form.getRawValue();
    user.organizationCNPJ = this.form.get('organizationCNPJ').value.cnpj;
    this._subscription.add(
      this._userService.createUser(user).subscribe(
        (res) => {
          this._toast.success('Sucesso', 'Usuário adicionado com sucesso.');
          this.user = res;
          this.disabled = true;
          this._changeEnableForm();
        }
      )
    )
  }

  private _delete(): void {
    const dialogRef = this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
      data: {
        title: 'Deletar Usuário',
        subtitle: 'Ao excluir um usuário ele será removido da base de dados. Esta é uma operação irreversível.',
        descriptionFirst: 'Confirma a exclusão do usuário:',
        descriptionSecond: this.user.name
      },
      width: '488px'
    });

    this._subscription.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this._userService.delete(this.user.id).subscribe(
            () => {
              this._toast.success('Deletar Usuário', 'Usuário removido com sucesso.');
              this._back();
            }
          )
        }
      })
    )
  }

  private _enable(): void {
    this.user.active = !this.user.active;
    this._subscription.add(
      this._userService.updateUser(this.user).subscribe(
        (res) => {
          if (this.user.active) {
            this._toast.success('Sucesso', 'Usuário habilitado com sucesso.');
          } else {
            this._toast.success('Sucesso', 'Usuário desabilitado com sucesso.');
          }
          this.user = res;
          this._updateForm();
        }
      )
    )
  }

  private _initForm(): void {
    this.form = this._formBuilder.group({
      active: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      organizationCNPJ: ['', Validators.required],
      type: ['', Validators.required],
      id: [{ value: '', disabled: true }],
      createdByUsername: [{ value: '', disabled: true }],
      creationDate: [{ value: '', disabled: true }],
      modificationDate: [{ value: '', disabled: true }],
      updatedByUsername: [{ value: '', disabled: true }],
    })
  }

  private _setById(): void {
    if (this._activatedRoute.snapshot.params.id) {
      this.user = this._activatedRoute.snapshot.data['user'];
      this._updateForm();
      this._changeEnableForm();
      this._cdr.detectChanges();
    }
  }

  private _update(): void {
    let user: UsuarioIdentidadeModel = this.form.getRawValue();
    user.organizationCNPJ = this.form.get('organizationCNPJ').value.cnpj;
    user.active = this.user.active;
    delete user.createdByUsername;
    delete user.creationDate;
    delete user.updatedByUsername;
    delete user.modificationDate;
    this._subscription.add(
      this._userService.updateUser(user).subscribe(
        (res) => {
          this._toast.success('Sucesso', 'Usuário salvo com sucesso.');
          this.user = res;
          this.disabled = true;
          this._changeEnableForm();
        }
      )
    )
  }

  private _updateForm(): void {
    this.form.get('active').setValue(this.user.active ? 'ATIVO' : 'INATIVO');
    this.form.get('name').setValue(this.user.name);
    this.form.get('username').setValue(this.user.username);
    this.form.get('email').setValue(this.user.email);
    this.form.get('organizationCNPJ').setValue(this.user.organizationCNPJ);
    this.form.get('type').setValue(this.user.type);
    this.form.get('id').setValue(this.user.id);
    this.form.get('createdByUsername').setValue(this.user.createdByUsername);
    this.form.get('creationDate').setValue(this.user.creationDate);
    this.form.get('modificationDate').setValue(this.user.modificationDate);
    this.form.get('updatedByUsername').setValue(this.user.updatedByUsername);
  }
}
