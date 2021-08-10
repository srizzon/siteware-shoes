import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommissioningFormComponent } from './commissioning-form/commissioning-form.component';
import { CommissioningPageComponent } from './commissioning-page/commissioning-page.component';
import { ComissionamentosPorIdResolver } from '@services/apis/financeiro/resolvers/comissionamento-por-id-resolver';
import { ComissionamentosResolver } from '@services/apis/financeiro/resolvers/comissionamento-resolver';
import { ProdutosResolver } from '@services/apis/financeiro/resolvers/produtos.resolver';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';

const commissioningRoutes: Routes = [
  {
    path: '',
    component: CommissioningPageComponent,
    data: {
      header: {
        title: 'Lista de Comissionamentos',
        text: 'Aqui você pode realizar o <strong>consulta de comissionamento</strong> cadastrados.</span>'
      },
    },
    resolve: {
      comissionamentos: ComissionamentosResolver
    }
  },
  {
    path: ROUTES_APLICATION.add,
    component: CommissioningFormComponent,
    data: {
      header: {
        title: 'Cadastro de Comissionamentos',
        text: 'Aqui você pode realizar o <strong>cadastro de um comissionamento</strong>, basta apenas preencher os campos abaixo.</span>'
      },
    },
    resolve: {
      produtos: ProdutosResolver
    }
  },
  {
    path: `${ROUTES_APLICATION.detail}/:id`,
    component: CommissioningFormComponent,
    data: {
      header: {
        title: 'Edição de Comissionamentos',
        text: 'Aqui você pode realizar o <strong>edição de um comissionamento</strong>, basta apenas preencher os campos que deseja alterar.</span>'
      },
    },
    resolve: {
      comissionamento: ComissionamentosPorIdResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(commissioningRoutes)],
  exports: [RouterModule],
})
export class CommissioningRoutingModule {}
