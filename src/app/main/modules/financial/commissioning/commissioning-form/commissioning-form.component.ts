import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ComissionamentoModel } from '@models/financeiro/comissionamento.model';
import { ComissionamentoService } from '@services/apis/financeiro/comissionamento.service';
import { Produto } from '@models/financeiro/produto.model';
import { ProdutoService } from '@services/apis/financeiro/produto.service';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { Toast } from '@services/outros/toast.service';
import { switchMap, map } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-commissioning-form',
  templateUrl: './commissioning-form.component.html',
  styleUrls: ['./commissioning-form.component.scss']
})
export class CommissioningFormComponent implements OnInit, OnDestroy {

  commissioning: ComissionamentoModel = new ComissionamentoModel();
  form: FormGroup;
  products: Produto[] = [];
  product: Produto = new Produto();
  private _subscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _comissionamentoService: ComissionamentoService,
    private _cdr: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _produtoService: ProdutoService,
    private _router: Router,
    private _toast: Toast,
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this.getData();
    this.getProducts();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  getData() {
    this._subscription.add(
      this._activatedRoute.params
        .subscribe(
          () => {
            if (this._activatedRoute.snapshot.params.id) {
              this.commissioning = this._activatedRoute.snapshot.data['comissionamento'][0];
            }
            this.initForm();
          }
        )
    )
  }

  getProducts() {
    this._subscription.add(
      this.form.controls['cfc']
        .valueChanges
        .pipe(
          switchMap((res) => {
            if (res) {
              return this._produtoService.getAll({ cfcCnpj: res.cnpj })
            }
            else {
              return of([])
            }
          })
        ).subscribe(
          (res) => {
            this.products = res
            if (this._activatedRoute.snapshot.params.id) {
              const produtoResolver = this._activatedRoute.snapshot.data['comissionamento'][0];
              this.form.get('product').setValue(produtoResolver.produto.id);
              this.form.get('product').disable();
              this.setProductData();
              this._cdr.detectChanges();
            }
          }
        )
    )
  }

  initForm(): void {
    this.form = this._formBuilder.group({
      cnpjEmpresa: [this.commissioning.cnpjEmpresa, Validators.required],
      cfc: [this.commissioning.produto ? this.commissioning.produto.cfcCnpj : '', Validators.required],
      product: [this.commissioning.produto, Validators.required],
      type: [this.commissioning.tipo, Validators.required],
      value: [this.commissioning.valor, Validators.required],
    });
  }

  setProductData() {
    const idProduct = this.form.get('product').value;
    this.product = this.products.find(x => x.id === idProduct);
  }

  onSubmit() {
    const values = this.form.getRawValue();
    const payload: ComissionamentoModel = {
      cnpjEmpresa: values.cnpjEmpresa,
      produtoId: values.product,
      valor: values.value,
      tipo: 'F',
    };

    let END_POINT;
    if (this.commissioning.id) {
      payload.id = this.commissioning.id;
      END_POINT = this._comissionamentoService.update(payload);
    } else {
      END_POINT = this._comissionamentoService.create(payload);
    }

    END_POINT.subscribe(
      () => {
        this._toast.success('Comissionamento');
        this.back();
      }
    )
  }

  back(): void {
    this._router.navigate([`/${ROUTES_APLICATION.financial.path}/${ROUTES_APLICATION.financial.commissioning}`]);
  }
}
