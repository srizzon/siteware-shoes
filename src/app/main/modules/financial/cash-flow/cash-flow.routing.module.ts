import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CashFlowPageComponent } from './cash-flow-page/cash-flow-page.component';

const routes: Routes = [
  {
    path: '',
    component: CashFlowPageComponent,
    data: {
      header: {
        title: 'Fluxo de Caixa',
        text: 'Aqui você pode realizar o <strong>consulta dos Fluxos de Caixa</strong>.</span>'
      },
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashFlowRoutingModule {}
