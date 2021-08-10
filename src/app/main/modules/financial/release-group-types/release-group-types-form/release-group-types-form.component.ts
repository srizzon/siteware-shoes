import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { ButtonsMenuEventsEnum } from '@core/enums/buttons-menu-events.enum';
import { ButtonsMenuModel } from '@core/models/outros/buttons-menu.model';
import { ConfirmDialogComponent, ConfirmDialogInterface } from '@components/dialogs/confirm-dialog/confirm-dialog.component';
import { GrupoLancamentoModel } from '@models/financeiro/grupo-lancamento.model';
import { GrupoLancamentoService } from '@services/apis/financeiro/grupo-lancamento.service';
import { Helper } from '@core/utils/helper';
import { TipoDeLancamentoModel } from '@core/models/financeiro/tipo-de-lancamento.model';
import { TipoDeLancamentoService } from '@services/apis/financeiro/tipo-de-lancamento.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-release-group-types-form',
  templateUrl: './release-group-types-form.component.html',
  styleUrls: ['./release-group-types-form.component.scss']
})
export class ReleaseGroupTypesFormComponent implements OnInit {

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
  form: FormGroup;
  tipoDeLancamento: TipoDeLancamentoModel = new TipoDeLancamentoModel();
  groups: GrupoLancamentoModel[];

  types = [
    { id: 'CB', descricao: 'Crédito' },
    { id: 'DB', descricao: 'Débito' },
  ]
  private _subscription: Subscription;

  constructor(
    private _tipoDeLancamentoService: TipoDeLancamentoService,
    private _grupoLancamentoService: GrupoLancamentoService,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _router: Router
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._getGroups();
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

  private _initForm(): void {
    this.form = this._formBuilder.group({
      descricao: [null, Validators.required],
      ativo: [true, Validators.required],
      tipo: [null, Validators.required],
      grupoLancamentoId: [null, Validators.required],
      valorPadrao: [null, [Validators.required, Validators.min(0.01)]],
      id: [{ value: '', disabled: true }],
      dataCadastro: [{ value: '', disabled: true }],
      usuarioCadastro: [{ value: '', disabled: true }],
      dataAlteracao: [{ value: '', disabled: true }],
      usuarioAlteracao: [{ value: '', disabled: true }],
    })
  }

  private _setById(): void {
    if (this._activatedRoute.snapshot.params.id) {
      this.tipoDeLancamento = this._activatedRoute.snapshot.data['tipoDeLancamento'];
      this._updateForm();
      this._changeEnableForm();
      this._cdr.detectChanges();
    }
  }

  private _changeEnableForm(): void {
    if (!this.disabled) {
      this.form.get('descricao').enable();
      this.form.get('ativo').enable();
      this.form.get('tipo').enable();
      this.form.get('grupoLancamentoId').enable();
      this.form.get('valorPadrao').enable();
    } else {
      this.form.get('descricao').disable();
      this.form.get('ativo').disable();
      this.form.get('tipo').disable();
      this.form.get('grupoLancamentoId').disable();
      this.form.get('valorPadrao').disable();
    }
    this.disabled = !this.disabled;
    this._cdr.detectChanges();
  }

  private _back(): void {
    this._router.navigate([Helper.checkUrlBack(this._activatedRoute)], { relativeTo: this._activatedRoute });
  }

  private _create(): void {
    let tipoDeLancamento: TipoDeLancamentoModel = this.form.getRawValue();

    this._subscription.add(
      this._tipoDeLancamentoService.create(tipoDeLancamento).subscribe(
        (res) => {
          this._toastrService.success('Sucesso', 'Tipo de Lançamento adicionado com sucesso.');
          this.tipoDeLancamento = res;
          this.disabled = true;
          this._changeEnableForm();
        }
      )
    )
  }

  private _delete(): void {
    const dialogRef = this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
      data: {
        title: 'Deletar Tipo de Lançamento',
        subtitle: 'Ao excluir um tipo de lançamento ele será removido da base de dados. Esta é uma operação irreversível.',
        descriptionFirst: 'Confirma a exclusão do tipo de lançamento:',
        descriptionSecond: this.tipoDeLancamento.descricao
      },
      width: '488px'
    });

    this._subscription.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this._tipoDeLancamentoService.delete(this.tipoDeLancamento.id).subscribe(
            () => {
              this._toastrService.success('Deletar Tipo de Lançamento', 'Tipo de Lançamento removido com sucesso.');
              this._back();
            }
          )
        }
      })
    )
  }

  private _enable(): void {
    this.tipoDeLancamento.ativo = !this.tipoDeLancamento.ativo;
    this._subscription.add(
      this._tipoDeLancamentoService.update(this.tipoDeLancamento).subscribe(
        (res) => {
          if (this.tipoDeLancamento.ativo) {
            this._toastrService.success('Sucesso', 'Tipo de Lançamento habilitado com sucesso.');
          } else {
            this._toastrService.success('Sucesso', 'Tipo de Lançamento desabilitado com sucesso.');
          }
          this.tipoDeLancamento = res;
          this._updateForm();
        }
      )
    )
  }

  private _update(): void {
    let tipoDeLancamento: TipoDeLancamentoModel = this.form.getRawValue();
    delete tipoDeLancamento.dataCadastro;
    delete tipoDeLancamento.usuarioCadastro;
    delete tipoDeLancamento.dataAlteracao;
    delete tipoDeLancamento.usuarioAlteracao;

    this._subscription.add(
      this._tipoDeLancamentoService.update(tipoDeLancamento).subscribe(
        (res) => {
          this._toastrService.success('Sucesso', 'Tipo de Lançamento salvo com sucesso.');
          this.tipoDeLancamento = res;
          this.disabled = true;
          this._changeEnableForm();
        }
      )
    )
  }

  private _updateForm(): void {
    this.form.get('descricao').setValue(this.tipoDeLancamento.descricao)
    this.form.get('ativo').setValue(this.tipoDeLancamento.ativo)
    this.form.get('tipo').setValue(this.tipoDeLancamento.tipo)
    this.form.get('grupoLancamentoId').setValue(this.tipoDeLancamento.grupoLancamentoId)
    this.form.get('valorPadrao').setValue(this.tipoDeLancamento.valorPadrao)
    this.form.get('id').setValue(this.tipoDeLancamento.id)
    this.form.get('dataCadastro').setValue(this.tipoDeLancamento.dataCadastro)
    this.form.get('usuarioCadastro').setValue(this.tipoDeLancamento.usuarioCadastro)
    this.form.get('dataAlteracao').setValue(this.tipoDeLancamento.dataAlteracao)
    this.form.get('usuarioAlteracao').setValue(this.tipoDeLancamento.usuarioAlteracao)
  }

  private _getGroups(): void {
    this.groups = this._activatedRoute.snapshot.data['groupRelease'];
  }

}
