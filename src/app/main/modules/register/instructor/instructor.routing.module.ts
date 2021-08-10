import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { InstrutorPorCpfResolver } from '@services/apis/gestao/resolvers/instrutor-por-cpf.resolver';
import { InstrutorResolver } from '@services/apis/gestao/resolvers/instrutor.resolver';
import { InstructorFormComponent } from './instructor-form/instructor-form.component';
import { InstructorPageComponent } from './instructor-page/instructor-page.component';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';

const routes: Routes = [
  {
    path: '',
    component: InstructorPageComponent,
    data: {
      header: {
        title: 'Consulta Instrutores',
        text: 'Aqui você pode realizar a consulta dos <strong>instrutores</strong> cadastrados.</span>'
      },
    },
    resolve: {
      instructors: InstrutorResolver
    }
  },
  {
    path: ROUTES_APLICATION.add,
    component: InstructorFormComponent,
    data: {
      header: {
        title: 'Adicionar Instrutor',
        text: 'Aqui você pode realizar o cadastro de um novo <strong>instrutor</strong>.</br> Basta preencher os <strong>campos</strong> abaixo.</span>'
      },
    },
  },
  {
    path: `${ROUTES_APLICATION.detail}/:cpf`,
    component: InstructorFormComponent,
    data: {
      header: {
        title: 'Editar Instrutor',
        text: 'Aqui você pode realizar a edição de um <strong>instrutor</strong> existente.</span>'
      },
    },
    resolve: {
      instructor: InstrutorPorCpfResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule {}
