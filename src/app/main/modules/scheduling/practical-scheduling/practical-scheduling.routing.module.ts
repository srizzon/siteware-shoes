import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PracticalSchedulingPageComponent } from './practical-scheduling-page/practical-scheduling-page.component';
import { PracticalSchedulingFormComponent } from './practical-scheduling-form/practical-scheduling-form.component';
import { SchedulePracticalById } from '@services/apis/agendamento-pratico/resolvers/schedule-practical-by-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: PracticalSchedulingPageComponent,
    data: {
      header: {
        title: 'Consulta de Agendamentos Prático Cadastrados',
        text: 'Aqui você consegue visualizar os agendamentos <strong>cadastrados</strong>.'
      }
    }
  },
  {
    path: ROUTES_APLICATION.add,
    component: PracticalSchedulingFormComponent,
    data: {
      header: {
        title: 'Adicionar Agendamento Prático',
        text: 'Aqui você pode realizar a criação de um <strong>agendamento práticos</strong>.</span> <br> Começe informando o número <strong>RENACH</strong> de um <strong>candidato</strong>'
      },
    }
  },
  {
    path: `${ROUTES_APLICATION.detail}/:id`,
    component: PracticalSchedulingFormComponent,
    data: {
      header: {
        title: 'Agendamento Prático',
        text: 'Aqui você pode <strong>visualizar</strong> os dados de um <strong>agendamento práticos</strong>.'
      },
    },
    resolve: {
      schedule: SchedulePracticalById
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticalSchedulingRoutingModule {}
