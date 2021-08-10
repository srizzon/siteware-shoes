import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { ContratoPorIdResolver } from '@core/services/apis/financeiro/resolvers/contrato-por-id-resolver';

import { ContractsFormComponent } from './contracts-form/contracts-form.component';
import { ContractsPageComponent } from './contracts-page/contracts-page.component';

const routes: Routes = [
  {
    path: '',
    component: ContractsPageComponent,
    data: {
      header: {
        title: 'Consulta Contratos',
        text: 'Aqui você pode visualizar os <strong>contratos existentes</strong>. Comece selecionando ao menos um <strong>CFC</strong>, caso queira, pode refinar a pesquisa informando também um <strong>Candidato</strong>.' },
    },
  },
  {
    path: `${ROUTES_APLICATION.detail}/:id`,
    component: ContractsFormComponent,
    data: {
      header: {
        title: 'Detalhes',
        text: 'Aqui você pode visualizar os detalhes de um contrato.'
      },
    },
    resolve: {
      contract: ContratoPorIdResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractsRoutingModule { }
