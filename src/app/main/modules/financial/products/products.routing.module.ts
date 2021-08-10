import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';

import { ProductsFormComponent } from './products-form/products-form.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProdutosResolver } from '@core/services/apis/financeiro/resolvers/produtos.resolver';
import { ProdutosPorIdResolver } from '@core/services/apis/financeiro/resolvers/produtos-por-id.resolver';

const productRoutes: Routes = [
  {
    path: '',
    component: ProductsPageComponent,
    data: {
      header: {
        title: 'Consulta Produtos Cadastrados',
        text:
          'Aqui você pode visualizar os <strong>produtos cadastrados</strong> e tembém fazer o <strong>gerencimanto</strong> de seus dados.</span>',
      },
    },
    resolve: {
      products: ProdutosResolver,
    },
  },
  {
    path: ROUTES_APLICATION.add,
    component: ProductsFormComponent,
    data: {
      header: {
        title: 'Cadastro de Produtos',
        text:
          'Aqui você pode realizar o <strong>cadastro de produtos</strong>, basta apenas preencher os campos abaixo.</span>',
      },
    },
  },
  {
    path: `${ROUTES_APLICATION.detail}/:id`,
    component: ProductsFormComponent,
    data: {
      header: {
        title: 'Editar Dados do Produto',
        text:
          'Aqui você pode realizar a <strong>alteração</strong> dos dados do <strong>candidato</strong>, basta apenas preencher os campos abaixo.</span>',
      },
    },
    resolve: {
      product: ProdutosPorIdResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule { }
