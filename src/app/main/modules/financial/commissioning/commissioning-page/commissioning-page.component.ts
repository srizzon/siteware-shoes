import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ComissionamentoService } from '@services/apis/financeiro/comissionamento.service';
import { ComissionamentoModel } from '@models/financeiro/comissionamento.model';
import { ConfirmDialogComponent, ConfirmDialogInterface } from '@components/dialogs/confirm-dialog/confirm-dialog.component';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { TableCustom } from '@models/outros/table-custom.model';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';
import { Toast } from '@services/outros/toast.service';

@Component({
  selector: 'app-commissioning-page',
  templateUrl: './commissioning-page.component.html',
  styleUrls: ['./commissioning-page.component.scss']
})
export class CommissioningPageComponent implements OnInit, OnDestroy {

  tableData: TableCustom;
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _comissionamentoService: ComissionamentoService,
    private _dialog: MatDialog,
    private _router: Router,
    private _toast: Toast
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  getData(): void {
    this.createTable(this._activatedRoute.snapshot.data['comissionamentos']);
  }

  createTable(bankAccounts): void {
    this.tableData = {
      columns: [
        'descricao',
        'margemLucro',
        'valor',
        'cnpjEmpresa',
        'actions',
      ],
      result: {
        defaultMessage: '',
        noData: ''
      },
      title: 'Listagem de Produtos',
      width: '90%',
      data: bankAccounts,
      columnData: {
        descricao: {
          header: 'DESCRIÇÃO',
          type: TableColumnTypeEnum.OBJECT,
          element: 'produto.descricao',
        },
        tipo: {
          header: 'TIPO',
          type: TableColumnTypeEnum.STRING,
          element: 'tipo',
        },
        margemLucro: {
          header: 'MARGEM LUCRO',
          type: TableColumnTypeEnum.OBJECT,
          element: 'produto.margemLucro',
        },
        valor: {
          header: 'VALOR',
          type: TableColumnTypeEnum.STRING,
          element: 'valor'
        },
        valorPadrao: {
          header: 'VALOR PADRÃO',
          type: TableColumnTypeEnum.OBJECT,
          element: 'produto.valorPadrao',
        },
        valorMinimo: {
          header: 'VALOR MÍNIMO',
          type: TableColumnTypeEnum.OBJECT,
          element: 'produto.valorMinimo',
        },
        quantidade: {
          header: 'QUANTIDADE',
          type: TableColumnTypeEnum.OBJECT,
          element: 'produto.quantidade',
        },
        market: {
          header: 'MARKET',
          type: TableColumnTypeEnum.OBJECT,
          element: 'produto.market',
        },
        cnpjEmpresa: {
          header: 'CNPJ CFC',
          type: TableColumnTypeEnum.OBJECT,
          pipe: TablePipesTypeEnum.CNPJ,
          element: 'produto.cfcCnpj',
        },
        actions: {
          header: 'AÇÕES',
          buttonType: 'icons',
          type: TableColumnTypeEnum.BUTTONS,
          buttons: [
            {
              icon: 'edit',
              onClick: (data) => this.edit(data),
            },
            {
              icon: 'delete',
              onClick: (data) => this.delete(data),
            },
          ],
        },
      },
    };
  }

  add(): void {
    this._router.navigate([`${ROUTES_APLICATION.add}`], { relativeTo: this._activatedRoute });
  }

  edit(comissionamento: ComissionamentoModel): void {
    this._router.navigate([`${ROUTES_APLICATION.detail}`, comissionamento.id], { relativeTo: this._activatedRoute });
  }

  delete(comissionamento: ComissionamentoModel) {
    const dialogRef = this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
      data: {
        title: 'Excluir Produto',
        subtitle: 'Ao excluir um produto ele será removido da base de dados. Esta é uma operação irreversível.',
        descriptionFirst: 'Confirma a exclusão do produto:',
        descriptionSecond: comissionamento.produto.descricao,
      },
      width: '500px'
    });

    this._subscription.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this._comissionamentoService.delete(comissionamento.id).subscribe(
            () => {
              this._toast.success('Remover Conta');
              const index = this.tableData.data.findIndex((x) => x.id === comissionamento.id);
              this.tableData.data.splice(index, 1);
              this.tableData = Object.assign({}, this.tableData);
            }
          );
        }
      })
    )
  }
}
