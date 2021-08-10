import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvailabilityBlockingManagementFormComponent } from './availability-blocking-management-form/availability-blocking-management-form.component';
import { AvailabilityBlockingManagementPageComponent } from './availability-blocking-management-page/availability-blocking-management-page.component';
import { MarcacaoExameDisponibilidadeBloqueioPorIdResolver } from '@core/services/apis/gestao/resolvers/marcacao-exame-disponibilidade-bloqueio-por-id.resolver';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';

const routes: Routes = [
  {
    path: '',
    component: AvailabilityBlockingManagementPageComponent,
    data: {
      header: {
        title: 'Bloqueio Disponibilidade de Marcação de Exame',
        text: 'Aqui você pode realizar o bloqueio das <strong>disponibilidades</strong> de agenda cadastradas.</span>'
      },
    }
  },
  {
    path: ROUTES_APLICATION.add,
    component: AvailabilityBlockingManagementFormComponent,
    data: {
      header: {
        title: 'Adicionar Bloqueio Disponibilidade',
        text: 'Aqui você pode realizar o cadastro de um novo <strong>bloqueio</strong> de disponibilidade de Marcação de Exame.</br> Para começar, preencha os campos <strong>local, tipo de exame, dia semana, turno e observação</strong>.</span>'
      },
    }
  },
  {
    path: `${ROUTES_APLICATION.detail}/:id`,
    component: AvailabilityBlockingManagementFormComponent,
    data: {
      header: {
        title: 'Editar Bloqueio Disponibilidade',
        text: 'Aqui você pode realizar a edição de uma <strong>disponibilidade</strong> existente.'
      },
    },
    resolve: {
      disponibilidade: MarcacaoExameDisponibilidadeBloqueioPorIdResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvailabilityBlockingManagementRoutingModule { }
