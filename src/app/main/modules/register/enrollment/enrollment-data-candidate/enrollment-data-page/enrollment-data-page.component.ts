import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { AgendamentoModel } from '@models/agendamento/agendamento.model';
import { Credito } from '@models/gestao/credito.model';
import { MatriculaGestaoModel } from '@models/gestao/matricula-gestao.model';
import { Produto } from '@models/financeiro/produto.model';
import { SalesDialogComponent } from '@components/dialogs/sales-dialog/sales-dialog.component';
import { SalesSubjectService } from '@services/outros/sales-subject.service';
import { ShoppingCartService } from '@services/outros/shopping-cart.service';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-enrollment-data',
  templateUrl: './enrollment-data-page.component.html',
  styleUrls: ['./enrollment-data-page.component.scss']
})
export class EnrollmentDataPageComponent implements OnInit, OnDestroy {

  agendamentos: AgendamentoModel[] = new Array<AgendamentoModel>();
  creditos: Credito[] = new Array<Credito>();
  imageUser: string = './assets/images/png/foto.png';
  matricula: MatriculaGestaoModel = new MatriculaGestaoModel();
  produtos: Produto[] = new Array<Produto>();
  showCartIcon: Boolean = false;
  index: number = 0;

  private _subscription: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private dialog: MatDialog,
    private _salesSubject: SalesSubjectService
  ) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._getDataById();
    this._getCartData();
    this._observSalle();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  back() {
    this.router.navigate([`/${ROUTES_APLICATION.register.path}/${ROUTES_APLICATION.register.enrollment}`]);
  }

  changeIndex(tabChangeEvent: MatTabChangeEvent) {
    this.index = tabChangeEvent.index;
  }

  openCart() {
    let width = '1000px';

    if (!this.matricula.candidato.email || !this.matricula.candidato.telefone) {
      width = '650px'
    }

    const dialogRef = this.dialog.open(SalesDialogComponent, {
      width: width,
      disableClose: true,
    })
  }

  private _observSalle(): void {
    this._salesSubject.getSales().subscribe(
      (res) => {
        console.log(res)
        if (res) {
          this.index = 2;
          this._salesSubject.setSales(false);
        }
      }
    )
  }


  private _getDataById(): void {
    if (this.activatedRoute.snapshot.params.id) {
      this.matricula = this.activatedRoute.snapshot.data['matricula'];
      this.produtos = this.activatedRoute.snapshot.data['produtos'];
      this.creditos = this.activatedRoute.snapshot.data['creditos'];
      if (this.activatedRoute.snapshot.params['new']) {
        this.index = 1;
      }
    }
  }

  private _getCartData(): void {
    if (this.activatedRoute.snapshot.params.id) {
      this._subscription.add(
        this.shoppingCartService.cart().subscribe(
          (res) => {
            if (res.length > 0) {
              this.showCartIcon = true;
            } else {
              this.showCartIcon = false;
            }
          }
        )
      )
    }
  }
}
