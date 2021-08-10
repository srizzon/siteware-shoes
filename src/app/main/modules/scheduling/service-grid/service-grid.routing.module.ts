import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { ServiceGridPageComponent } from './service-grid-page/service-grid-page.component';
import { ServiceGridFormComponent } from './service-grid-form/service-grid-form.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceGridPageComponent,
    data: {
      header: {
        title: 'Consulta Grade de Serviço',
        text:
          'Aqui você pode visualizar as <strong>grades de seriços cadastradas</strong>. Assim como acessar a página para <strong>cadastrar uma nova grade</strong>.',
      },
    },
  },
  {
    path: ROUTES_APLICATION.add,
    component: ServiceGridFormComponent,
    data: {
      header: {
        title: 'Cadastro de Grade Serviço',
        text:
          'Faça a distribuição do esquema de aulas<strong> dos cursos para um turno e serviço</strong>',
      },
    },
  },
  {
    path: `${ROUTES_APLICATION.detail}/:id`,
    component: ServiceGridFormComponent,
    data: {
      header: {
        title: 'Edição de Grade Serviço',
        text:
          'Altere as distribuições do esquema de aulas<strong> dos cursos para um turno e serviço</strong>',
      },
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceGridRoutingModule { }
