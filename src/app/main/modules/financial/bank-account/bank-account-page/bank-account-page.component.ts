import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { Subscription } from 'rxjs';

import { CfcModel } from '@models/gestao/cfc.model';
import { ContaCorrenteService } from '@services/apis/financeiro/conta-corrente.service';
import { ConfirmDialogComponent, ConfirmDialogInterface } from '@components/dialogs/confirm-dialog/confirm-dialog.component';
import { ServicesSubject } from '@services/outros/services-subjects.service';
import { TableCustom } from '@models/outros/table-custom.model';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { Toast } from '@services/outros/toast.service';

@Component({
  selector: 'app-bank-account-page',
  templateUrl: './bank-account-page.component.html',
  styleUrls: ['./bank-account-page.component.scss']
})
export class BankAccountPageComponent implements OnInit, OnDestroy {

  tableData: TableCustom;
  cfcs: CfcModel[] = [];
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _contaCorrenteService: ContaCorrenteService,
    private _toast: Toast,
    private _router: Router,
    private _servicesSubject: ServicesSubject,
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this.getAllCfcs();
    this.getAllBankAccounts();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }


  getAllCfcs(): void {
    this._subscription.add(
      this._servicesSubject.getCfcs().subscribe(
        (res) => this.cfcs = res
      )
    )
  }

  getAllBankAccounts(): void {
    this._subscription.add(

      this._activatedRoute.params
        .subscribe(
          () => {
            let accounts = this._activatedRoute.snapshot.data['accounts'];
            const bankAccounts = accounts.map(account => {
              const company = this.cfcs.find(({ cnpj }) => cnpj === account.cnpjEmpresa);

              return {
                ...account,
                description: account.descricao ? account.descricao : '',
                usuarioIntegracao: account.usuarioIntegracao ? account.usuarioIntegracao : '',
                empresa: company ? company.nome : '',
                bankName: account && account.banco && account.banco.descricao ? account.banco.descricao : '',
                agency: account.agencia ? account.agencia : '',
                account: account.conta ? account.conta : '',
              };
            });

            this.createTable(bankAccounts);
          }
        )
    )
  }

  createTable(bankAccounts): void {
    this.tableData = {
      columns: [
        'description',
        'usuarioIntegracao',
        'empresa',
        'bankName',
        'agency',
        'account',
        'actions',
      ],
      result: {
        defaultMessage: '',
        noData: ''
      },
      title: 'Listagem de Contas Correntes',
      width: '90%',
      data: bankAccounts,
      columnData: {
        description: {
          header: 'DESCRIÇÃO',
          type: TableColumnTypeEnum.STRING,
          element: 'description',
        },
        usuarioIntegracao: {
          header: 'NOME USUÁRIO',
          type: TableColumnTypeEnum.STRING,
          element: 'usuarioIntegracao',
        },
        empresa: {
          header: 'EMPRESA',
          type: TableColumnTypeEnum.STRING,
          element: 'empresa',
        },
        bankName: {
          header: 'BANCO',
          type: TableColumnTypeEnum.STRING,
          element: 'bankName',
        },
        agency: {
          header: 'AGÊNCIA',
          type: TableColumnTypeEnum.STRING,
          element: 'agency',
        },
        account: {
          header: 'CONTA',
          type: TableColumnTypeEnum.STRING,
          element: 'account',
        },
        actions: {
          header: 'AÇÕES',
          buttonType: 'icons',
          type: TableColumnTypeEnum.BUTTONS,
          buttons: [
            {
              icon: 'edit',
              onClick: (data) => this.editBankAccount(data),
            },
            {
              icon: 'delete',
              onClick: (data) => this.deleteBankAccount(data),
            },
          ],
        },
      },
    };
  }

  addBankAccount(): void {
    this._router.navigate([`${ROUTES_APLICATION.add}`], { relativeTo: this._activatedRoute });
  }

  editBankAccount(bankAccount): void {
    this._router.navigate([`${ROUTES_APLICATION.detail}`, bankAccount.id], { relativeTo: this._activatedRoute });
  }

  deleteBankAccount(bankAccount) {
    const dialogRef = this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
      data: {
        title: 'Excluir Conta Corrente',
        subtitle: 'Ao excluir um conta corrente ele será removida da base de dados. Esta é uma operação irreversível.',
        descriptionFirst: 'Confirma a exclusão da conta:',
        descriptionSecond: bankAccount.descricao,
      },
      width: '488px'
    });
    this._subscription.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this._contaCorrenteService.delete(bankAccount.id).subscribe(
            () => {
              this._toast.success('Remover Conta');
              const index = this.tableData.data.findIndex((x) => x.id === bankAccount.id);
              this.tableData.data.splice(index, 1);
              this.tableData = Object.assign({}, this.tableData);
            }
          );
        }
      })
    )
  }
}
