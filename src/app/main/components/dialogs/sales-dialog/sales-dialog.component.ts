import { VendaService } from './../../../../core/services/apis/financeiro/vendas.service';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Inject, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ContratoFinanceiroService } from '@services/apis/financeiro/contrato-financeiro.service';
import { ConfirmDialogComponent, ConfirmDialogInterface } from '@components/dialogs/confirm-dialog/confirm-dialog.component';
import { MatriculaGestaoModel } from '@models/gestao/matricula-gestao.model';
import { Router } from '@angular/router';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { SalesDialog } from '@models/outros/sales-dialog.model';
import { SalesSubjectService } from '@services/outros/sales-subject.service';
import { ShoppingCartService } from '@services/outros/shopping-cart.service';
import { Toast } from '@services/outros/toast.service';
import { TYPE_OF_PAYMENTS } from '@constants/type-of-payments.constants';
import { TypeOfPaymentsEnum } from '@enums/type-of-payments.enum';
import { UserControllerService } from '@services/outros/user-controller.service';
import { Venda } from '@models/financeiro/venda-model';

@Component({
  selector: 'app-sales-dialog',
  templateUrl: './sales-dialog.component.html',
  styleUrls: ['./sales-dialog.component.scss']
})
export class SalesDialogComponent {

  form: FormGroup;
  productsForm: FormGroup;
  typePayment = TYPE_OF_PAYMENTS;
  typePaymentEnum = TypeOfPaymentsEnum;
  dataSourceProducts: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['descricao', 'valorMinimo', 'quantidade']
  matricula: MatriculaGestaoModel;
  minDate = new Date();

  private _subscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SalesDialog,
    private _contratoFinanceiroService: ContratoFinanceiroService,
    private _dialogRef: MatDialogRef<SalesDialogComponent>,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _salesSubjectService: SalesSubjectService,
    private _shoppingCartService: ShoppingCartService,
    private _toast: Toast,
    private _router: Router,
    private _userControllerservice: UserControllerService,
    private _vendaService: VendaService
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this.matricula = this._shoppingCartService.getCandidate();
    this.dataSourceProducts.data = this._shoppingCartService.getCart();
    this.initForm();
  }


  add(element): void {
    element.quantidade++;
  }

  checkButton(): boolean {
    const fields = this.form.getRawValue();
    if (this.form.get('typeOfPayment').value == '') {
      return true;
    } else if (this.isCarne()) {
      return (
        fields.firstInstallment == '' ||
        fields.numberInstallments == '' ||
        fields.typeOfPayment == null
      );
    } else if (this.isBoleto()) {
      return false;
    } else if (this.isCredito()) {
      return (
        fields.firstInstallment == '' ||
        fields.numberInstallments == '' ||
        fields.operatorCode == '' ||
        fields.typeOfPayment == null
      );
    }
  }

  getTotal(): number {
    let total = 0;
    this.dataSourceProducts.data.forEach(
      (element) => {
        const valor = element.quantidade * element.valorMinimo;
        total += valor;
      }
    )
    return total + this.form.get('extraValue').value;
  }

  initForm(): void {
    this.form = this._formBuilder.group({
      typeOfPayment: [''],
      operatorCode: [''],
      numberInstallments: [''],
      firstInstallment: [''],
      off: [false],
      totalOff: [''],
      totalValue: [''],
      extraValue: ['']
    });

    this.productsForm = this._formBuilder.group({});
    this.dataSourceProducts.data
      .forEach(control => this.productsForm.addControl(control.id, this._formBuilder.control(1)));
  }

  isCarne(): boolean {
    return this.form.get('typeOfPayment').value == this.typePaymentEnum.CARNE;
  }

  isBoleto(): boolean {
    return this.form.get('typeOfPayment').value == this.typePaymentEnum.BOLETO;
  }

  isCredito(): boolean {
    return this.form.get('typeOfPayment').value == this.typePaymentEnum.CARTAO_DE_CREDITO;
  }

  onSubmit(): void {

    this._dialogRef.disableClose = true;
    let dataForm = this.form.getRawValue();
    let dataValue: SalesDialog = new SalesDialog();
    let payload: Venda = new Venda();

    payload.modoPagamentoContaId = dataForm.typeOfPayment;

    const produtos = [];
    this.dataSourceProducts.data.forEach(res => {
      produtos.push({
        id: res.id,
        quantidade: res.quantidade
      })
    })

    payload.documentoEntidade = this.matricula.candidato.cpf;
    payload.nomeEntidade = this.matricula.candidato.nome;
    payload.emailEntidade = this.matricula.candidato.email;
    payload.telefoneEntidade = this.matricula.candidato.telefone;
    payload.cnpjEmpresa = this._userControllerservice.getUserLogged().organizationCNPJ;
    payload.nomeEmpresa = this._userControllerservice.getUserLogged().organizationNome;
    payload.valor = Number(this.getTotal());
    payload.desconto = 0;
    payload.produto = produtos;
    payload.matriculaId = this.matricula.id;

    if (this.isBoleto()) {
      payload.formaPagamentoId = 3;
    }

    this._subscription.add(
      this._vendaService.createVendaPf(payload).subscribe(
        (res) => {
          this._toast.success('Produtos', 'Produto ofertado com sucesso.');
          this._salesSubjectService.setSales(true);
          this._shoppingCartService.resetCart();
        },
        () => {
          this._dialogRef.disableClose = false;
          this._shoppingCartService.resetCart();
          this._dialogRef.close(false);
        }
      )
    )
  }

  regularize(): void {
    this._shoppingCartService.resetCart();
    this._router.navigate([`/${ROUTES_APLICATION.register.path}/${ROUTES_APLICATION.register.enrollment}/${ROUTES_APLICATION.detail}`, this.matricula.id]);
  }

  remove(element): void {
    element.quantidade--;
    if (element.quantidade == 0) {
      this.removeFromCart(element);
    }
  }

  removeFromCart(element): void {
    const dialogRef = this._dialog.open<ConfirmDialogComponent, ConfirmDialogInterface>(ConfirmDialogComponent, {
      data: {
        title: 'Excluir item do carrinho',
        subtitle: 'Ao informar uma quantidade de 0 itens, este pode ser excluido do carrinho.',
        descriptionFirst: 'Deseja excluir o item?',
      },
      width: '488px'
    });
    this._subscription.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this._shoppingCartService.removeCart(element);
          this.dataSourceProducts.data = this._shoppingCartService.getCart();
        }
      })
    )
  }

  updateValue(element): void {
    setTimeout(() => {
      const quantity = this.productsForm.get(`${element.id}`).value;
      if (quantity > 0) {
        element.quantidade = quantity;
      } else if (quantity === 0) {
        this.removeFromCart(element)
      } else {
        element.quantity = 0;
      }
    }, 100);
  }

}
