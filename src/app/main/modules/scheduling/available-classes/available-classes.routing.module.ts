import { AgendamentosResolver } from '@services/apis/agendamento/resolvers/agendamentos.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AvailableClassesDetailComponent } from './available-classes-detail/available-classes-detail.component';
import { AvailableClassesPageComponent } from './available-classes-page/available-classes-page.component';
import { GradeCandidatoResolver } from '@services/apis/agendamento/resolvers/grade-canidato.resolver';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';

const routes: Routes = [
  {
    path: '',
    component: AvailableClassesPageComponent,
    data: {
      header: {
        title: 'Consulta de aulas disponíveis',
        text: 'Veja as aulas com <strong>vagas disponíveis para reposição e reintegração</strong> de alunos, de acordo com os filtros abaixo.',
      },
    },
  },
  {
    path: `${ROUTES_APLICATION.schedule.availableClassesDetail}/:id`,
    component: AvailableClassesDetailComponent,
    data: {
      header: {
        title: 'Detalhes da aula',
        text: 'Aqui você consulta os detalhes da aula.',
      },
    },
    resolve: {
      candidateByGrid: GradeCandidatoResolver,
      schedule: AgendamentosResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvailableClassesRoutingModule { }
