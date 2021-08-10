import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { ButtonsMenuEventsEnum } from '@core/enums/buttons-menu-events.enum';
import { ButtonsMenuModel } from '@models/outros/buttons-menu.model';
import { ConfirmDialogComponent, ConfirmDialogInterface } from '@components/dialogs/confirm-dialog/confirm-dialog.component';
import { CfcModel } from '@models/gestao/cfc.model';
import { CfcService } from '@services/apis/gestao/cfc.service';
import { Helper } from '@core/utils/helper';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { Toast } from '@services/outros/toast.service';

@Component({
  selector: 'app-cfc-form',
  templateUrl: './cfc-form.component.html',
  styleUrls: ['./cfc-form.component.scss'],
})
export class CfcFormComponent implements OnInit, AfterViewInit, OnDestroy {

  buttons: ButtonsMenuModel = new ButtonsMenuModel({
    back: true,
    create: true,
    delete: true,
    enable: false,
    propertyId: 'id',
    showButtons: true,
    update: true
  })
  disabled: boolean = true;
  cfcForm: FormGroup;
  cfc: CfcModel = new CfcModel();
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cfcService: CfcService,
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _toast: Toast
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._initForm();
  }

  ngAfterViewInit(): void {
    this._setCfcById();
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
    if (event == ButtonsMenuEventsEnum.UPDATE) this._create();
  }

  private _create() {
    let payload: CfcModel = new CfcModel();
    payload = this.cfcForm.getRawValue();
    payload.unidadeDetranId = this.cfcForm.get('unidadeDetranId').value.id;
    let END_POINT;
    if (payload.id) {
      END_POINT = this._cfcService.updateCfc(payload);
    } else {
      END_POINT = this._cfcService.createCfc(payload);
    }

    this._subscription.add(
      END_POINT.subscribe(
        () => {
          this._toast.success('CFC');
          this._router.navigate([`/${ROUTES_APLICATION.register.path}/${ROUTES_APLICATION.register.cfc}`]);
        },
      )
    )
  }

  private _back(): void {
    this._router.navigate([Helper.checkUrlBack(this._activatedRoute)], { relativeTo: this._activatedRoute });
  }

  private _delete(): void {
    const dialogRef = this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
      data: {
        title: 'Remover Cfc',
        subtitle: `Tem certeza que deseja remover o CFC: ${this.cfc.nome}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._cfcService.deleteCfc(this.cfc.id).subscribe(
          () => this._toast.success('Remover Cfc')
        );
      }
    });
  }

  private _initForm() {
    this.cfcForm = this._formBuilder.group({
      id: [{ value: '', disabled: true }],
      bairro: [{ value: '', disabled: true }],
      cidade: [{ value: '', disabled: true }],
      cep: [{ value: '', disabled: true }],
      cnpj: [{ value: '', disabled: true }],
      complemento: [{ value: '', disabled: true }],
      estado: [{ value: '', disabled: true }],
      latitude: [{ value: '', disabled: true }],
      logradouro: [{ value: '', disabled: true }],
      longitude: [{ value: '', disabled: true }],
      nome: [{ value: '', disabled: true }],
      nomeFantasia: [{ value: '', disabled: true }],
      numero: [{ value: '', disabled: true }],
      razaoSocial: [{ value: '', disabled: true }],
      statusDetranId: [{ value: '', disabled: true }],
      dataAlteracao: [{ value: '', disabled: true }],
      dataCadastro: [{ value: '', disabled: true }],
      dataDiario: [{ value: '', disabled: true }],
      dataValidade: [{ value: '', disabled: true }],
      usuarioAlteracao: [{ value: '', disabled: true }],
      usuarioCadastro: [{ value: '', disabled: true }],

      associado: [''],
      ativo: [''],
      classificacao: [''],
      codCfcDetran: ['', [Validators.required]],
      codFilialDetran: ['', [Validators.required]],
      emailContato: [''],
      emailFaturamento: [''],
      matriz: [''],
      marcacaoExame: [''],
      portaria: [''],
      processo: [''],
      relatorioMarcacaoExame: [''],
      telefone: [''],
      unidadeDetranId: ['', [Validators.required]],
      usuarioReuniaoOnline: [''],
    });
  }

  private _updateCfcForm(): void {
    this.cfcForm.get('id').setValue(this.cfc.id);
    this.cfcForm.get('bairro').setValue(this.cfc.bairro);
    this.cfcForm.get('cidade').setValue(this.cfc.cidade);
    this.cfcForm.get('cep').setValue(this.cfc.cep);
    this.cfcForm.get('cnpj').setValue(this.cfc.cnpj);
    this.cfcForm.get('complemento').setValue(this.cfc.complemento);
    this.cfcForm.get('estado').setValue(this.cfc.estado);
    this.cfcForm.get('latitude').setValue(this.cfc.latitude);
    this.cfcForm.get('logradouro').setValue(this.cfc.logradouro);
    this.cfcForm.get('longitude').setValue(this.cfc.longitude);
    this.cfcForm.get('nome').setValue(this.cfc.nome);
    this.cfcForm.get('nomeFantasia').setValue(this.cfc.nomeFantasia);
    this.cfcForm.get('numero').setValue(this.cfc.numero);
    this.cfcForm.get('razaoSocial').setValue(this.cfc.razaoSocial);
    this.cfcForm.get('statusDetranId').setValue(this.cfc.statusDetranId);
    this.cfcForm.get('dataAlteracao').setValue(this.cfc.dataAlteracao);
    this.cfcForm.get('dataCadastro').setValue(this.cfc.dataCadastro);
    this.cfcForm.get('dataDiario').setValue(this.cfc.dataDiario);
    this.cfcForm.get('dataValidade').setValue(this.cfc.dataValidade);
    this.cfcForm.get('usuarioAlteracao').setValue(this.cfc.usuarioAlteracao);
    this.cfcForm.get('usuarioCadastro').setValue(this.cfc.usuarioCadastro);

    this.cfcForm.get('associado').setValue(this.cfc.associado);
    this.cfcForm.get('ativo').setValue(this.cfc.ativo);
    this.cfcForm.get('classificacao').setValue(this.cfc.classificacao);
    this.cfcForm.get('codCfcDetran').setValue(this.cfc.codCfcDetran);
    this.cfcForm.get('codFilialDetran').setValue(this.cfc.codFilialDetran);
    this.cfcForm.get('emailContato').setValue(this.cfc.emailContato);
    this.cfcForm.get('emailFaturamento').setValue(this.cfc.emailFaturamento);
    this.cfcForm.get('marcacaoExame').setValue(this.cfc.marcacaoExame);
    this.cfcForm.get('matriz').setValue(this.cfc.matriz);
    this.cfcForm.get('portaria').setValue(this.cfc.portaria);
    this.cfcForm.get('processo').setValue(this.cfc.processo);
    this.cfcForm.get('relatorioMarcacaoExame').setValue(this.cfc.relatorioMarcacaoExame);
    this.cfcForm.get('telefone').setValue(this.cfc.telefone);
    this.cfcForm.get('unidadeDetranId').setValue(this.cfc.unidadeDetranId);
    this.cfcForm.get('usuarioReuniaoOnline').setValue(this.cfc.usuarioReuniaoOnline);
  }

  private _setCfcById() {
    if (this._activatedRoute.snapshot.params.cnpj) {
      this.cfc = this._activatedRoute.snapshot.data['cfc'][0];
      this._updateCfcForm();
      this._changeEnableForm();
      this._cdr.detectChanges();
    }
  }

  private _changeEnableForm(): void {
    if (!this.disabled) {
      this.cfcForm.get('associado').enable();
      this.cfcForm.get('ativo').enable();
      this.cfcForm.get('classificacao').enable();
      this.cfcForm.get('codCfcDetran').enable();
      this.cfcForm.get('codFilialDetran').enable();
      this.cfcForm.get('emailContato').enable();
      this.cfcForm.get('emailFaturamento').enable();
      this.cfcForm.get('matriz').enable();
      this.cfcForm.get('marcacaoExame').enable();
      this.cfcForm.get('portaria').enable();
      this.cfcForm.get('processo').enable();
      this.cfcForm.get('telefone').enable();
      this.cfcForm.get('relatorioMarcacaoExame').enable();
      this.cfcForm.get('unidadeDetranId').enable();
      this.cfcForm.get('usuarioReuniaoOnline').enable();
    } else {
      this.cfcForm.get('associado').disable();
      this.cfcForm.get('ativo').disable();
      this.cfcForm.get('classificacao').disable();
      this.cfcForm.get('codCfcDetran').disable();
      this.cfcForm.get('codFilialDetran').disable();
      this.cfcForm.get('emailContato').disable();
      this.cfcForm.get('emailFaturamento').disable();
      this.cfcForm.get('matriz').disable();
      this.cfcForm.get('marcacaoExame').disable();
      this.cfcForm.get('portaria').disable();
      this.cfcForm.get('processo').disable();
      this.cfcForm.get('relatorioMarcacaoExame').disable();
      this.cfcForm.get('telefone').disable();
      this.cfcForm.get('unidadeDetranId').disable();
      this.cfcForm.get('usuarioReuniaoOnline').disable();

    }
    this.disabled = !this.disabled;
    this._cdr.detectChanges();
  }
}
