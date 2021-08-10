import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent, ConfirmDialogInterface } from 'src/app/main/components/dialogs/confirm-dialog/confirm-dialog.component';
import { ProdutoService } from '@services/apis/financeiro/produto.service';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { TableCustom } from '@models/outros/table-custom.model';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
import { Toast } from '@services/outros/toast.service';
import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';

@Component({
  selector: 'app-product-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {

  tableData: TableCustom;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private toast: Toast,
    private router: Router,
    private productService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      () => {
        let products = this.activatedRoute.snapshot.data['products'];

        products.forEach(element => {
          if(element.tipoProduto === 'A'){
            element.tipoProdutoText = 'AVULSO';
          }
          if(element.tipoProduto === 'P'){
            element.tipoProdutoText = 'PACOTE';
          }
        });

        this.createTable(products);
      },
      () => {
        this.toast.error(
          'Produto',
          'Não foi possível carregar a lista de produtos.'
        );
      }
    );
  }

  addProduct(): void {
    this.router.navigate([`${ROUTES_APLICATION.add}`], { relativeTo: this.activatedRoute });
  }

  createTable(products): void {
    this.tableData = {
      columns: [
        'descricao',
        'tipoProduto',
        'valorMinimo',
        'margemLucro',
        'marketPlace',
        'cfc',
        'actions',
      ],
      result: {
        defaultMessage : '',
        noData : ''
      },
      title: 'Listagem de Produtos',
      width: '90%',
      data: products,
      columnData: {
        descricao: {
          header: 'DESCRIÇÃO',
          type: TableColumnTypeEnum.STRING,
          element: 'descricao',
        },
        tipoProduto: {
          header: 'TIPO DE PRODUTO',
          type: TableColumnTypeEnum.STRING,
          element: 'tipoProdutoText',
        },
        valorMinimo: {
          header: 'VALOR MINIMO',
          type: TableColumnTypeEnum.STRING,
          element: 'valorMinimo',
          pipe: TablePipesTypeEnum.CURRENCY
        },
        cfc: {
          header: 'CFC',
          type: TableColumnTypeEnum.STRING,
          element: 'cfcNome',
        },
        margemLucro: {
          header: 'MARGEM LUCRO',
          type: TableColumnTypeEnum.STRING,
          element: 'margemLucro',
        },
        marketPlace: {
          header: 'MARKET PLACE',
          type: TableColumnTypeEnum.STRING,
          element: 'market',
          pipe: TablePipesTypeEnum.TRUE_FALSE,
        },
        actions: {
          header: 'AÇÕES',
          buttonType: 'icons',
          type: TableColumnTypeEnum.BUTTONS,
          buttons: [
            {
              icon: 'edit',
              onClick: (data) => this.editProduct(data),
            },
            {
              icon: 'delete',
              onClick: (data) => this.deleteProduct(data),
            },
          ],
        },
      },
    };
  }

  editProduct(produto): void {
    this.router.navigate(
      [`${ROUTES_APLICATION.detail}`, produto.id],
      { relativeTo: this.activatedRoute }
    );
  }

  deleteProduct(product): void {
    const dialogRef = this.dialog.open<
      ConfirmDialogComponent,
      ConfirmDialogInterface
    >(ConfirmDialogComponent, {
      data: {
        title: 'Remover Candidato',
        subtitle: `Tem certeza que deseja remover o produto: ${product.descricao}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.delete(product.id).subscribe(
          () => {
            this.toast.success('Remover Candidato');
            const index = this.tableData.data.findIndex(
              (x) => x.id === product.id
            );
            this.tableData.data.splice(index, 1);
            this.tableData = Object.assign({}, this.tableData);
          },
          () => this.toast.error('Remover Candidato')
        );
      }
    });
  }
}
