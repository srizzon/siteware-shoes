import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationModules } from '@enums/application-modules.enum';
import { ManagementComponent } from './management.component';
import { menuConfig } from '@constants/menu.constants';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { RulesGuard } from '@core/guards/rules.guard';

const { icon, name } = menuConfig.find(({ id }) => id === ApplicationModules.MANAGEMENT);

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    data: { icon, name },

    children: [
      {
        path: ROUTES_APLICATION.management.schedulingExams,
        canActivate: [RulesGuard],
        data: {
          title: 'Marcação de Exames',
        },
        loadChildren: () => import('./scheduling-exams/scheduling-exams.module').then((m) => m.ExamsModule),
      },
      {
        path: ROUTES_APLICATION.management.availability,
        canActivate: [RulesGuard],
        data: {
          title: 'Disponibilidade de Marcação de Exame',
        },
        loadChildren: () => import('./availability-management/availability-management.module').then((m) => m.AvailabilityManagementModule),
      },
      {
        path: ROUTES_APLICATION.management.block,
        canActivate: [RulesGuard],
        data: {
          title: 'Bloqueio de Disponibilidade de Marcação de Exame',
        },
        loadChildren: () => import('./availability-blocking-management/availability-blocking-management.module').then((m) => m.AvailabilityBlockingManagementModule),
      },

    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
