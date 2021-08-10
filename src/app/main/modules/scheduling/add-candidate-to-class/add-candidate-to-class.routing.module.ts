import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CandidatosPorIdAgendamentoResolver } from '@services/apis/agendamento/resolvers/candidato-por-id-agendamento.resolver';
import { GradePorIdResolver } from '@services/apis/agendamento/resolvers/grade-por-id.resolver';
import { GradeCandidatoResolver } from '@services/apis/agendamento/resolvers/grade-canidato.resolver';
import { ClassPageComponent } from './class-page/class-page.component';
import { AgendamentosResolver } from '@services/apis/agendamento/resolvers/agendamentos.resolver';

const routes: Routes = [
  {
    path: 'agendamento/:id',
    component: ClassPageComponent,
    data: {
      header: {
        title: 'Adicione alunos à turma deste agendamento',
        text: 'Adicione um por vez usando a seta. Os candidatos serão inscritos em todas as aulas deste agendamento.</span>'
      },
    },
    resolve: {
      agendamentoCandidatos: CandidatosPorIdAgendamentoResolver,
      agendamento: AgendamentosResolver
    }
  },
  {
    path: 'grid/:id',
    component: ClassPageComponent,
    data: {
      header: {
        title: 'Adicione alunos à turma desta grade',
        text: 'Adicione um por vez usando a seta. Os candidatos serão inscritos em todas as aulas deste agendamento.</span>'
      },
    },
    resolve: {
      gradePorId: GradePorIdResolver,
      gradeCandidatos: GradeCandidatoResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCandidateToClassRoutingModule { }
