import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EnrollmentCreditPageComponent } from './enrollment-credit-page/enrollment-credit-page.component';
import { TipoCreditoResolver } from '@services/apis/financeiro/resolvers/tipo-credito.resolver';

const routes: Routes = [
  {
    path: '',
    component: EnrollmentCreditPageComponent,
    data: {
      header: {
        title: 'Consulta de Créditos de Matrículas Cadastradas',
        text: 'Aqui você consegue visualizar os créditos de matrículas que <strong>possuem cadastro</strong> vinculados à matrícula.'
      }
    },
    resolve: {
      creditTypes: TipoCreditoResolver
    }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentCreditRoutingModule { }
