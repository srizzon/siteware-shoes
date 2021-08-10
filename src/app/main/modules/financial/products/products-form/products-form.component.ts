import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CfcModel } from '@models/gestao/cfc.model';
import { Produto } from '@models/financeiro/produto.model';
import { ProductCreditType } from '@models/gestao/product-credit-type.model';
import { ProductFormModel } from '@models/forms/product-form.model';
import { ProdutoService } from '@services/apis/financeiro/produto.service';
import { PRODUCT_TYPE } from '@constants/product-type.constants';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { Toast } from '@services/outros/toast.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit {

  form: FormGroup;
  cfcs: CfcModel[];
  productCreditTypes: ProductCreditType[];
  productType = PRODUCT_TYPE;
  product: Produto = new Produto();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _productService: ProdutoService,
    private _router: Router,
    private _toast: Toast,
  ) { }

  ngOnInit(): void {
    if (this._activatedRoute.snapshot.params.id) {
      this._activatedRoute.params.subscribe((params) => {
        this.product = this._activatedRoute.snapshot.data['product'];
        this.product.tipoProduto = 1;
        this.initForm();
      });
    } else {
      this.initForm();
    }
  }

  onSubmit() {
    let payload: Produto = new Produto();
    const values: ProductFormModel = this.form.getRawValue();
    payload.ativo = values.ativo;
    payload.cfcCnpj = values.cfc.cnpj;
    payload.descricao = values.descricao;
    payload.tipoProduto = PRODUCT_TYPE.find((c) => c.id.toString() == values.tipoProduto).descricao;
    payload.margemLucro = values.margemLucro;
    payload.market = values.market;
    payload.quantidade = values.quantidade;
    payload.valorMinimo = values.valorMinimo;
    payload.valorPadrao = values.valorPadrao;

    let END_POINT;
    if (values.id) {
      payload.id = values.id;
      END_POINT = this._productService.update(payload);
    } else {
      END_POINT = this._productService.create(payload);
    }

    END_POINT.subscribe(
      () => {
        this._toast.success('Produto');
        this.back();
      }
    );
  }

  initForm(product?: Produto): void {
    this.form = this._formBuilder.group({
      ativo:            [ this.product.ativo ],
      cfc:              [ this.product.cfcCnpj,  Validators.required],
      dataAlteracao:    [ { value:  this.product.dataAlteracao, disabled: true } ],
      dataCadastro:     [ { value:  this.product.dataCadastro, disabled: true } ],
      descricao:        [ this.product.descricao, Validators.required],
      margemLucro:      [ this.product.margemLucro, Validators.required],
      market:           [ this.product.market ],
      id:               [ this.product.id ],
      tipoProduto:      [ this.product.tipoProduto, Validators.required ],
      quantidade:       [ this.product.quantidade, Validators.required ],
      usuarioAlteracao: [ { value:  this.product.usuarioAlteracao, disabled: true }],
      usuarioCadastro:  [ { value:  this.product.usuarioCadastro, disabled: true }],
      valorMinimo:      [ this.product.valorMinimo, Validators.required],
      valorPadrao:      [ this.product.valorPadrao, Validators.required],
    });
  }

  back(): void {
    this._router.navigate([`/${ROUTES_APLICATION.financial.path}/${ROUTES_APLICATION.financial.products}`]);
  }
}
