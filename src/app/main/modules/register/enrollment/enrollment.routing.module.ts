import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ContratosResolver } from '@services/apis/financeiro/resolvers/contratos.resolver';
import { EnrollmentDataPageComponent } from './enrollment-data-candidate/enrollment-data-page/enrollment-data-page.component';
import { EnrollmentListComponent } from './enrollment-list/enrollment-list.component';
import { EnrollmentFormComponent } from './enrollment-form/enrollment-form.component';
import { MatriculaGestaoPorIdResolver } from '@services/apis/gestao/resolvers/matricula-gestao-por-id.resolver';
import { MatriculaGestaoResolver } from '@services/apis/gestao/resolvers/matricula-gestao.resolver';
import { ProdutosResolver } from '@services/apis/financeiro/resolvers/produtos.resolver';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';

const EnrollRoutes: Routes = [
  {
    path: '',
    component: EnrollmentListComponent,
    data: {
      header: {
        title: `Consulta de Matriculas`,
        text: `Aqui você pode visualizar as <strong>matriculas realizadas do CFC</strong> e também realizar novas.</span>`
      },
    },
  },
  {
    path: ROUTES_APLICATION.add,
    component: EnrollmentFormComponent,
    data: {
      header: {
        title: 'Cadastro de Matricula',
        text: 'Aqui você pode realizar o <strong>cadastro de uma MATRICULA</strong>, basta apenas preencher os campos abaixo.</span>' }
    },
  },
  {
    path: `${ROUTES_APLICATION.detail}/:id`,
    component: EnrollmentFormComponent,
    data: {
      header: {
        title: 'Editar Matricula',
        text: 'Aqui você pode realizar a <strong>alteração</strong> dos dados de uma <strong>CFC</strong>, basta apenas preencher os campos abaixo.</span>'
      },
    },
    resolve: {
      enrollment: MatriculaGestaoPorIdResolver,
    },
  },
  {
    path: `${ROUTES_APLICATION.register.enrollmentData}/:id/:cpf`,
    component: EnrollmentDataPageComponent,
    data: {
      title: 'Informações do Candidato',
      header: {
        title: 'Dados do candidato / aluno',
      }
    },
    resolve: {
      matricula: MatriculaGestaoResolver,
      produtos: ProdutosResolver,
      contratos: ContratosResolver
    }
  },
  {
    path: `${ROUTES_APLICATION.register.enrollmentData}/:id/:cpf/:new`,
    component: EnrollmentDataPageComponent,
    data: {
      title: 'Informações do Candidato',
      header: {
        title: 'Dados do candidato / aluno',
      }
    },
    resolve: {
      matricula: MatriculaGestaoResolver,
      produtos: ProdutosResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(EnrollRoutes)],
  exports: [RouterModule],
})
export class EnrollmentRoutingModule { }
