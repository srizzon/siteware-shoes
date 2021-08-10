import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BancoResolver } from '@services/apis/financeiro/resolvers/banco.resolver';
import { BankAccountFormComponent } from './bank-account-form/bank-account-form.component';
import { BankAccountPageComponent } from './bank-account-page/bank-account-page.component';
import { ContaCorrentePorIdIdResolver } from '@services/apis/financeiro/resolvers/conta-corrente-por-id.resolver';
import { ContasCorrenteResolver } from '@services/apis/financeiro/resolvers/contas-corrente.resolver';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';

const bankAccountRoutes: Routes = [
  {
    path: '',
    component: BankAccountPageComponent,
    data: {
      header: {
        title: 'Consulta Contas Cadastradas',
        text:
          'Aqui você pode visualizar as <strong>contas cadastradas</strong> e tembém fazer o <strong>gerencimanto</strong> de seus dados.</span>',
      }
    },
    resolve: {
      accounts: ContasCorrenteResolver,
    }
  },
  {
    path: ROUTES_APLICATION.add,
    component: BankAccountFormComponent,
    data: {
      header: {
        title: 'Cadastro de Contas',
        text: 'Aqui você pode realizar o <strong>cadastro de contas</strong>, basta apenas preencher os campos abaixo.</span>',
      }
    },
    resolve: {
      banks: BancoResolver
    }
  },
  {
    path: `${ROUTES_APLICATION.detail}/:id`,
    component: BankAccountFormComponent,
    data: {
      header: {
        title: 'Editar Dados de Conta',
        text: 'Aqui você pode realizar a <strong>alteração</strong> dos dados de <strong>contas</strong>, basta apenas preencher os campos abaixo.</span>'
      },
    },
    resolve: {
      account: ContaCorrentePorIdIdResolver,
      banks: BancoResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(bankAccountRoutes)],
  exports: [RouterModule],
})
export class BankAccountRoutingModule { }
