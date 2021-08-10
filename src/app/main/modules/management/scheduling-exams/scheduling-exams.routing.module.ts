import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllowedGuard } from '@core/guards/allowed.guard';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { MarcacaoExamePorIdResolver } from '@services/apis/gestao/resolvers/marcacao-exame-por-id.resolver';
import { SchedulingExamsFormComponent } from './scheduling-exams-form/scheduling-exams-form.component';
import { SchedulingExamsPageComponent } from './scheduling-exams-page/scheduling-exams-page.component';


const routes: Routes = [
   {
    path: ROUTES_APLICATION.management.report,
    component: SchedulingExamsPageComponent,
    data: {
      header: {
        title: 'Relatório de Marcação de Exames',
        text: 'Aqui você pode realizar a <strong>consulta dos exames</strong> marcados.</span>'
      }
    },
    canActivate: [AllowedGuard],
  },
  {
    path: ROUTES_APLICATION.add,
    component: SchedulingExamsFormComponent,
    data: {
      header: {
        title: 'Marcação de Exames Detran',
        text: 'Aqui você pode realizar a marcação de exames para os <strong>candidatos</strong>. Comece informando o <strong>código RENACH</strong> e pesquisando o candidato.</span>'
      }
    },
    canActivate: [AllowedGuard],
  },
  {
    path: `${ROUTES_APLICATION.detail}/:id`,
    component: SchedulingExamsFormComponent,
    data: {
      header: {
        title: 'Marcação de Exames Detran',
        text: 'Aqui você pode <strong>visualizar</strong> os dados de um exame agendado.'
      }
    },
    canActivate: [AllowedGuard],
    resolve: {
      exame: MarcacaoExamePorIdResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulingExamsRoutingModule { }
