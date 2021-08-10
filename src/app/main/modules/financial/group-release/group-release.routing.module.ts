import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { GrupoLancamentoPorIdResolver } from '@services/apis/financeiro/resolvers/grupo-lancamento-por-id.resolver';
import { GroupReleaseFormComponent } from './group-release-form/group-release-form.component';
import { GroupReleasePageComponent } from './group-release-page/group-release-page.component';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';

const groupReleaseRoutes: Routes = [
  {
    path: '',
    component: GroupReleasePageComponent,
    data: {
      header: {
        title: `Consulta De Grupos de Lançamento`,
        text: `Aqui você pode visualizar as <strong>grupos de lançamentos</strong> existentes.</span>`,
      },
    }
  },
  {
    path: ROUTES_APLICATION.add,
    component: GroupReleaseFormComponent,
    data: {
      header: {
        title: 'Cadastro de Grupos de Lançamentos',
        text: 'Aqui você pode realizar o <strong>cadastro de uma Grupo de Laçamento</strong>, basta apenas preencher os campos abaixo.</span> <br> Preencha o campo e clique em SALVAR para criar o grupo de lançamento.'
      },
    },
  },
  {
    path: `${ROUTES_APLICATION.detail}/:id`,
    component: GroupReleaseFormComponent,
    data: {
      header: {
        title: 'Editar Grupos de Lançamentos',
        text: 'Aqui você pode realizar o <strong>edição de uma Grupo de Laçamento</strong>, basta apenas preencher os campos abaixo.</span> <br> Preencha o campo e clique em ATUALIZAR para alterar o nome do grupo de lançamento.'
      },
    },
    resolve: {
      groupRelease: GrupoLancamentoPorIdResolver
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(groupReleaseRoutes)],
  exports: [RouterModule],
})
export class GroupReleaseRoutingModule { }
