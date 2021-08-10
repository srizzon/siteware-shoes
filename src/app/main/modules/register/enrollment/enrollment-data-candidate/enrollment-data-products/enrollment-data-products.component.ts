import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { MatriculaGestaoModel } from '@models/gestao/matricula-gestao.model';
import { Produto } from '@models/financeiro/produto.model';
import { ShoppingCartService } from '@services/outros/shopping-cart.service';
import { TableCustom } from '@models/outros/table-custom.model';
import { TablePipesTypeEnum } from '@core/enums/table-pipes-types.enum';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { Toast } from '@services/outros/toast.service';
@Component({
  selector: 'app-enrollment-data-products',
  templateUrl: './enrollment-data-products.component.html',
  styleUrls: ['./enrollment-data-products.component.scss']
})
export class EnrollmentDataProductsComponent implements OnInit {

  produtos: Produto[] = new Array<Produto>();
  tableData: TableCustom;
  matricula: MatriculaGestaoModel = new MatriculaGestaoModel();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _shoppingCartService: ShoppingCartService,
    private _toast: Toast,
  ) { }

  ngOnInit(): void {
    this._createTable();
  }

  ngAfterViewInit(): void {
    this._setById();
  }

  private _createTable(): void {
    this.tableData = {
      columns: ['descricao', 'valorPadrao', 'actions'],
      title: 'Lista de Contratos',
      width: '82%',
      data: [],
      result: {
        noData: 'Não foi encontrado contratos para o candidato.',
        defaultMessage: 'Não existe dados para serem exibidos.'
      },
      columnData: {
        descricao: {
          header: 'PRODUTO',
          type: TableColumnTypeEnum.STRING,
          element: 'descricao'
        },
        valorPadrao: {
          header: 'VALOR',
          type: TableColumnTypeEnum.STRING,
          element: 'valorPadrao',
          pipe: TablePipesTypeEnum.CURRENCY
        },
        actions: {
          header: 'AÇÕES',
          buttonType: 'stroked',
          type: TableColumnTypeEnum.BUTTONS,
          buttons: [
            {
              icon: 'add_shopping_cart',
              label: 'ADICIONAR AO CARRINHO',
              onClick: (data) => this._offerProduct(data),
            }
          ]
        }
      }
    }
  }

  private _offerProduct(item): void {
    if (this._shoppingCartService.getCandidate() && (this._shoppingCartService.getCandidate().candidatoCpf != this.matricula.candidatoCpf)) {
      this._toast.info('Carrinho de Produtos', `Carrinho alterado para o candidato ${this.matricula.candidatoName}`)
    }
    item.quantidade = 1;
    this._shoppingCartService.addOne(item, this.matricula);
    this._toast.success('Adicionar Item', `${item.descricao} adicionado ao carrinho de produtos!`)
  }

  private _setById(): void {
    if (this._activatedRoute.snapshot.params.id) {
      this.matricula = this._activatedRoute.snapshot.data['matricula'];
      this.produtos = this._activatedRoute.snapshot.data['produtos'];
      this._cdr.detectChanges();
    }
  }

}
