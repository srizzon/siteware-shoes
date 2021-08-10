import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgendamentosResolver } from '@services/apis/agendamento/resolvers/agendamentos.resolver';
import { CandidatosPorIdAgendamentoResolver } from '@services/apis/agendamento/resolvers/candidato-por-id-agendamento.resolver'
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { TheorySchedulingFormComponent } from './theory-scheduling-form/theory-scheduling-form.component';
import { TheorySchedulingPageComponent } from './theory-scheduling-page/theory-scheduling-page.component';

const registerRouter: Routes = [
  {
    path: '',
    component: TheorySchedulingPageComponent,
    data: {
      header: {
        title: 'Consultar Agendamentos Existentes',
        text:
          'Aqui você pode realizar a busca por agendamentos de <strong> um instrutor.</strong> Comece pesquisando <strong> pelo nome do instrutor.</strong><br> Para adicionar um agendamento, basta clicar em <strong>Novo Agendamento</strong>.',
      },
    },
  },
  {
    path: ROUTES_APLICATION.schedule.manageSchedule,
    component: TheorySchedulingFormComponent,
    data: {
      header: {
        title: 'Cadastro de Novo Agendamento',
        text:
          'Aqui você poderá realizar o <strong> cadastro de um novo agendamento</strong> após preencher o campos abaixo. </span>',
      },
    },
  },
  {
    path: `${ROUTES_APLICATION.schedule.manageSchedule}/:id`,
    component: TheorySchedulingFormComponent,
    resolve: {
      schedule: AgendamentosResolver,
      candidate: CandidatosPorIdAgendamentoResolver,
    },
    data: {
      header: {
        title: 'Editar Agendamento Existente',
        text: 'Aqui você poderá realizar o <strong>edição de um agendamento.</strong> Para isso, basta alterar os campos desejados logo abaixo. </span>'
      },
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(registerRouter)],
  exports: [RouterModule],
})
export class TheorySchedulingRoutingModule { }
