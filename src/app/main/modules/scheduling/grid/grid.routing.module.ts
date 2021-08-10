import { GradePorIdResolver } from '@services/apis/agendamento/resolvers/grade-por-id.resolver';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GridFormComponent } from './grid-form/grid-form.component';
import { GridPageComponent } from './grid-page/grid-page.component';

const routes: Routes = [
  {
    path: '',
    component: GridPageComponent,
    data: {
      header: {
        title: 'Consulta de Grade',
        text: 'Aqui você pode consultar as grades disponíveis.'
      },
    },
  },
  {
    path: ROUTES_APLICATION.add,
    component: GridFormComponent,
    data: {
      header: {
        title: 'Cadastro de Grade',
        text: 'O sistema irá mostrar no calendário ao lado a distribuição dos dias das aulas, de acordo com as configurações da grade serviço.'
      },
    },
  },
  {
    path: `${ROUTES_APLICATION.detail}/:id`,
    component: GridFormComponent,
    data: {
      header: {
        title: 'Edição de Grade',
        text: 'Altere as grades de aulas<strong> dos cursos para um turno e serviço</strong>'
      },
    },
    resolve: {
      grade: GradePorIdResolver
    }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GridRoutingModule { }
