import { AuditPartnerPageComponent } from './audit-partner-page/audit-partner-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';

const routes: Routes = [
  {
    path: '',
    component: AuditPartnerPageComponent,
    data: {
      header: {
        title: 'Auditoria Parceria',
        text: 'Aqui você pode realizar o <strong>consulta das Auditorias de Parceria</strong>.</span>'
      },
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditPartnerRoutingModule {}
