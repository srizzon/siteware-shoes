import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ButtonsMenuEventsEnum } from '@core/enums/buttons-menu-events.enum';
import { ButtonsMenuModel } from '@core/models/outros/buttons-menu.model';
import { ContratoFinanceiroModel } from '@core/models/financeiro/contrato-financeiro.model';
import { ContratoItemModel } from '@core/models/financeiro/contrato-item.model';
import { FilterPaginationModel } from '@core/models/outros/filter-pagination.model';
import { Helper } from '@core/utils/helper';
import { LancamentoFinanceiroModel } from '@core/models/financeiro/lancamento-financeiro.model';
import { SituationContractEnum } from '@core/enums/situation-contract.enum';
import { TableColumnTypeEnum } from '@core/enums/table-column-type.enum';
import { TableCustom } from '@core/models/outros/table-custom.model';
import { TablePipesTypeEnum } from '@core/enums/table-pipes-types.enum';

@Component({
  selector: 'app-contracts-form',
  templateUrl: './contracts-form.component.html',
  styleUrls: ['./contracts-form.component.scss']
})
export class ContractsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  buttons: ButtonsMenuModel = new ButtonsMenuModel({
    back: true,
    create: false,
    delete: false,
    enable: false,
    propertyId: 'id',
    propertyActive: 'active',
    showButtons: true,
    update: false
  });
  disabled: boolean = true;
  form: FormGroup;

  contract: ContratoFinanceiroModel = new ContratoFinanceiroModel();

  tableContractItens: TableCustom;
  tableRelease: TableCustom;

  private _filter: FilterPaginationModel = {
    pageNumber: 0,
    pageSize: 5
  };
  private _filterBackup: FilterPaginationModel = {
    pageNumber: 0,
    pageSize: 5,
  }

  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _router: Router
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
  }

  private _initForm(): void {
    this.form = this._formBuilder.group({
      valorGlobal: [{ value: '', disabled: true }],
      matriculaId: [{ value: '', disabled: true }],
      cnpjEmpresa: [{ value: '', disabled: true }],
      situacaoContrato: [{ value: '', disabled: true }],
      descricao: [{ value: '', disabled: true }],
      boleto: [{ value: '', disabled: true }],
      carne: [{ value: '', disabled: true }],
      capa: [{ value: '', disabled: true }],
      id: [{ value: '', disabled: true }],
    })
  }

  private _setById(): void {
    if (this._activatedRoute.snapshot.params.id) {
      this.contract = this._activatedRoute.snapshot.data['contract'];
      this._updateForm();
      this._createTableContractItens(this.contract.contratoItens);
      this._createTableRelease(this.contract.lancamentosFinanceiros);
      this._cdr.detectChanges();
    }
  }

  private _updateForm(): void {
    this.form.get('valorGlobal').setValue(this.contract.valorGlobal);
    this.form.get('matriculaId').setValue(this.contract.matriculaId);
    this.form.get('cnpjEmpresa').setValue(this.contract.cnpjEmpresa);
    this.form.get('situacaoContrato').setValue(SituationContractEnum[this.contract.situacaoContrato]);
    this.form.get('descricao').setValue(this.contract.descricao);
    this.form.get('boleto').setValue(this.contract.boleto);
    this.form.get('carne').setValue(this.contract.carne);
    this.form.get('capa').setValue(this.contract.capa);
    this.form.get('id').setValue(this.contract.id);
  }

  private _back(): void {
    this._router.navigate([Helper.checkUrlBack(this._activatedRoute)], { relativeTo: this._activatedRoute });
  }

  private _createTableContractItens(data: ContratoItemModel[]): void {
    this.tableContractItens = {
      columns: ['produto', 'quantidade', 'valor'],
      result: {
        noData: `Não existem itens do contrato cadastrados para a pesquisa informada.`,
        defaultMessage: `Não foi possível realizar a listagem dos itens do contrato.`,
      },
      width: '100%',
      data: data,
      displayFilter: false,
      columnData: {
        produto: {
          header: 'Produto',
          type: TableColumnTypeEnum.OBJECT,
          element: 'produto.descricao',
        },
        quantidade: {
          header: 'QUANTIDADE',
          type: TableColumnTypeEnum.STRING,
          element: 'quantidade',
        },
        valor: {
          header: 'VALOR',
          type: TableColumnTypeEnum.STRING,
          element: 'valor',
          pipe: TablePipesTypeEnum.CURRENCY
        },
      },
    };
  }

  private _createTableRelease(data: LancamentoFinanceiroModel[]): void {
    this.tableRelease = {
      columns: ['descricao', 'valor', 'dataEmissao', 'dataVencimento', 'status'],
      result: {
        noData: `Não existem lançamentos financeiros cadastrados para a pesquisa informada.`,
        defaultMessage: `Não foi possível realizar a listagem dos lançamentos financeiros.`,
      },
      width: '100%',
      data: data,
      displayFilter: false,
      columnData: {
        descricao: {
          header: 'DESCRIÇÃO',
          type: TableColumnTypeEnum.STRING,
          element: 'descricao',
        },
        valor: {
          header: 'VALOR',
          type: TableColumnTypeEnum.STRING,
          element: 'valor',
          pipe: TablePipesTypeEnum.CURRENCY
        },
        dataEmissao: {
          header: 'DATA EMISSÃO',
          type: TableColumnTypeEnum.STRING,
          element: 'dataEmissao',
          pipe: TablePipesTypeEnum.DATE
        },
        dataVencimento: {
          header: 'DATA VENCIMENTO',
          type: TableColumnTypeEnum.STRING,
          element: 'dataVencimento',
          pipe: TablePipesTypeEnum.DATE
        },
        status: {
          header: 'STATUS',
          type: TableColumnTypeEnum.STRING,
          element: 'status',
          pipe: TablePipesTypeEnum.SITUATION_PAYMENT
        },
      },
    };
  }
}
