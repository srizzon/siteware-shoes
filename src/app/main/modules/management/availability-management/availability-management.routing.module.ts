import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvailabilityManagementFormComponent } from './availability-management-form/availability-management-form.component';
import { AvailabilityManagementPageComponent } from './availability-management-page/availability-management-page.component';
import { MarcacaoExameDisponibilidadePorIdResolver } from '@core/services/apis/gestao/resolvers/marcacao-exame-disponibilidade-por-id.resolver';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';

const routes: Routes = [
  {
    path: '',
    component: AvailabilityManagementPageComponent,
    data: {
      header: {
        title: 'Disponibilidade de Marcação de Exame',
        text: 'Aqui você pode realizar a consulta das <strong>disponibilidades</strong> cadastradas.</span>'
      },
    }
  },
  {
    path: ROUTES_APLICATION.add,
    component: AvailabilityManagementFormComponent,
    data: {
      header: {
        title: 'Adicionar Disponibilidade',
        text: 'Aqui você pode realizar o cadastro de uma nova <strong>disponibilidade</strong>.</br> Para começar, preencha os campos <strong>local, tipo de exame, horário, quantidade de vagas, código da turma e a situação</strong>.</span>'
      },
    }
  },
  {
    path: `${ROUTES_APLICATION.detail}/:id`,
    component: AvailabilityManagementFormComponent,
    data: {
      header: {
        title: 'Editar Disponibilidade',
        text: 'Aqui você pode realizar a edição de uma <strong>disponibilidade</strong> existente.'
      },
    },
    resolve: {
      disponibilidade: MarcacaoExameDisponibilidadePorIdResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvailabilityManagementRoutingModule { }
