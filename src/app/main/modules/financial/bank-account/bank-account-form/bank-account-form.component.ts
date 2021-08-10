import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { BancoModel } from '@models/financeiro/banco.model';
import { BankFormInterface } from '@models/forms/banco-form.model';
import { ContaCorrenteModel } from '@models/financeiro/conta-corrente.model';
import { ContaCorrenteService } from '@services/apis/financeiro/conta-corrente.service';
import { Helper } from '@utils/helper';
import { Toast } from '@services/outros/toast.service';

@Component({
  selector: 'app-bank-account-form',
  templateUrl: './bank-account-form.component.html',
  styleUrls: ['./bank-account-form.component.scss']
})
export class BankAccountFormComponent implements OnInit, OnDestroy {

  banks: BancoModel[] = new Array<BancoModel>()
  account: ContaCorrenteModel = new ContaCorrenteModel();
  formBank: FormGroup;
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _contacorrenteService: ContaCorrenteService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _toast: Toast,
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._initForm();
    this._getBanks();
    this._setAccountsById();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  add() {
    const values: BankFormInterface = this.formBank.getRawValue();
    const payload: ContaCorrenteModel = {
      agencia: values.agencia,
      bancoId: values.bancoId,
      clientId: values.clientId,
      cnpjEmpresa: values.cfc.cnpj,
      conta: values.conta,
      descricao: values.descricao,
      marketPlace: values.marketPlace,
      senhaIntegracao: values.senhaIntegracao,
      usuarioIntegracao: values.usuarioIntegracao,
    };

    this._subscription.add(
      this._contacorrenteService.create(payload)
        .subscribe(
          () => this._toast.success('Conta Corrente', 'Conta Corrente criada com sucesso.')
        )
    )
  }

  back(): void {
    this._router.navigate([Helper.checkUrlBack(this._activatedRoute)], { relativeTo: this._activatedRoute });
  }

  edit() {
    const values: BankFormInterface = this.formBank.getRawValue();
    const payload: ContaCorrenteModel = {
      ativo: true,
      agencia: values.agencia,
      id: values.id,
      bancoId: values.bancoId,
      clientId: values.clientId,
      cnpjEmpresa: values.cfc.cnpj,
      conta: values.conta,
      descricao: values.descricao,
      marketPlace: values.marketPlace,
      senhaIntegracao: values.senhaIntegracao,
      usuarioIntegracao: values.usuarioIntegracao,
    };

    this._subscription.add(
      this._contacorrenteService.update(payload)
        .subscribe(
          () => this._toast.success('Conta Corrente', 'Conta Corrente atualizada com sucesso.')
        )
    )
  }

  private _initForm(): void {

    this.formBank = this._formBuilder.group({
      agencia: ['', [Validators.required]],
      bancoId: ['', [Validators.required]],
      clientId: ['', [Validators.required]],
      cfc: ['', [Validators.required]],
      conta: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      id: [''],
      marketPlace: [false],
      senhaIntegracao: ['', [Validators.required]],
      usuarioIntegracao: ['', [Validators.required]],
    });
  }

  private _updateForm(): void {
    this.formBank.get('agencia').setValue(this.account.agencia);
    this.formBank.get('bancoId').setValue(this.account.bancoId);
    this.formBank.get('clientId').setValue(this.account.clientId);
    this.formBank.get('cfc').setValue(this.account.cnpjEmpresa);
    this.formBank.get('conta').setValue(this.account.conta);
    this.formBank.get('descricao').setValue(this.account.descricao);
    this.formBank.get('id').setValue(this.account.id);
    this.formBank.get('marketPlace').setValue(this.account.marketPlace);
    this.formBank.get('senhaIntegracao').setValue(this.account.senhaIntegracao);
    this.formBank.get('usuarioIntegracao').setValue(this.account.usuarioIntegracao);
  }

  private _setAccountsById(): void {
    if (this._activatedRoute.snapshot.params.id) {
      this.account = this._activatedRoute.snapshot.data['account'];
      this._updateForm();
      this._cdr.detectChanges();
    }
  }

  private _getBanks() {
    this.banks = this._activatedRoute.snapshot.data['banks'];
  }

}
