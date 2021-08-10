import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { GrupoLancamentoResolver } from '@services/apis/financeiro/resolvers/grupo-lancamento.resolver';
import { GrupoLancamentoPorIdResolver } from '@services/apis/financeiro/resolvers/grupo-lancamento-por-id.resolver';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { ReleaseGroupTypesFormComponent } from './release-group-types-form/release-group-types-form.component';
import { ReleaseGroupTypesPageComponent } from './release-group-types-page/release-group-types-page.component';
import { TipoDeLancamentoPorIdResolver } from '@core/services/apis/financeiro/resolvers/tipo-de-lancamento-por-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: ReleaseGroupTypesPageComponent,
    data: {
      header: {
        title: `Consulta De Tipos de lançamento`,
        text: `Aqui você pode visualizar os <strong>Tipos de lançamento</strong> existentes.</span>`,
      },
    },
    resolve: {
      groupRelease: GrupoLancamentoResolver
    }
  },
  {
    path: ROUTES_APLICATION.add,
    component: ReleaseGroupTypesFormComponent,
    data: {
      header: {
        title: 'Cadastro de Tipos de lançamento',
        text: 'Aqui você pode realizar o <strong>cadastro de uma Tipos de lançamento</strong>, basta apenas preencher os campos abaixo.</span> <br> Preencha o campo e clique em SALVAR para criar o grupo de lançamento.'
      },
    },
  },
  {
    path: `${ROUTES_APLICATION.detail}/:id`,
    component: ReleaseGroupTypesFormComponent,
    data: {
      header: {
        title: 'Editar Tipos de lançamento',
        text: 'Aqui você pode realizar o <strong>edição de um Tipos de lançamento</strong>, basta apenas preencher os campos abaixo.</span> <br> Preencha o campo e clique em ATUALIZAR para alterar o nome do grupo de lançamento.'
      },
    },
    resolve: {
      groupRelease: GrupoLancamentoPorIdResolver,
      tipoDeLancamento: TipoDeLancamentoPorIdResolver
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReleaseGroupTypesRoutingModule { }
