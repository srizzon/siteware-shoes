import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { LocalFormComponent } from './local-form/local-form.component';
import { LocalPageComponent } from './local-page/local-page.component';
import { LocalPorIdResolver } from '@services/apis/gestao/resolvers/local-por-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: LocalPageComponent,
    data: {
      header: {
        title: 'Consulta de Locais Cadastrados',
        text: 'Aqui você consegue visualizar os locais <strong>cadastrados</strong>.'
      }
    },
  },
  {
    path: ROUTES_APLICATION.add,
    component: LocalFormComponent,
    data: {
      header: {
        title: 'Cadastrar Local',
        text: 'Para cadastrar um local, você deve <strong>informar os dados </strong> e clicar em adicionar.'
      }
    }
  },
  {
    path: `${ROUTES_APLICATION.detail}/:id`,
    component: LocalFormComponent,
    data: {
      header: {
        title: 'Editar Local',
        text: 'Para editar um local, você pode <strong>informar os dados </strong> que deseja atualizar e clicar em salvar.'
      }
    },
    resolve: {
      local: LocalPorIdResolver
    }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalRoutingModule { }
