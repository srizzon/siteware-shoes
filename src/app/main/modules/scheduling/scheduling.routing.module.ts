import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ApplicationModules } from '@enums/application-modules.enum';
import { menuConfig } from '@constants/menu.constants';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { RulesGuard } from '@core/guards/rules.guard';
import { SchedulingComponent } from './scheduling.component';

const { icon, name } = menuConfig.find(({ id }) => id === ApplicationModules.SCHEDULING);

const schedulingRoutes: Routes = [
  {
    path: '',
    data: { icon, name },
    component: SchedulingComponent,
    children: [
      {
        path: ROUTES_APLICATION.schedule.serviceGrid,
        loadChildren: () => import('./service-grid/service-grid.module').then((m) => m.ServicegridModule),
        canActivate: [RulesGuard],
        data: {
          title: 'Grade Serviço',
        }
      },
      {
        path: ROUTES_APLICATION.schedule.grid,
        loadChildren: () => import('./grid/grid.module').then((m) => m.GridModule),
        canActivate: [RulesGuard],
        data: {
          title: 'Grades',
        }
      },
      {
        path: ROUTES_APLICATION.schedule.availableClasses,
        loadChildren: () => import('./available-classes/available-classes.module').then((m) => m.AvailableClassesModule),
        canActivate: [RulesGuard],
        data: {
          title: 'Aulas Disponíveis',
        }
      },
      {
        path: ROUTES_APLICATION.schedule.theory,
        loadChildren: () => import('./theory-scheduling/theory-scheduling.module').then((m) => m.TheorySchedulingModule),
        canActivate: [RulesGuard],
        data: {
          title: 'Agendamento Teórico',
        }
      },
      {
        path: ROUTES_APLICATION.schedule.practical,
        loadChildren: () => import('./practical-scheduling/practical-scheduling.module').then((m) => m.PraticalSchedulingModule),
        canActivate: [RulesGuard],
        data: {
          title: 'Agendamento Prático',
        }
      },
      {
        path: ROUTES_APLICATION.schedule.addCandidateToClass,
        loadChildren: () => import('./add-candidate-to-class/add-candidate-to-class.module').then((m) => m.AddCandidateToClassModule),
        canActivate: [RulesGuard],
        data: {
          title: 'Adicionar Candidato',
        }
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(schedulingRoutes)],
  exports: [RouterModule],
})
export class SchedulingRoutingModule {}
