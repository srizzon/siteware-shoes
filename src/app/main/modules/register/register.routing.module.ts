import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationModules } from '@enums/application-modules.enum';
import { menuConfig } from '@constants/menu.constants';
import { RegisterComponent } from './register.component';
import { ROUTES_APLICATION } from '@core/constants/routes-aplication.constants';
import { RulesGuard } from '@core/guards/rules.guard';

const { icon, name } = menuConfig.find(({ id }) => id === ApplicationModules.REGISTER);

const registerRouter: Routes = [
  {
    data: { icon, name },
    path: '',
    component: RegisterComponent,
    children: [
      {
        path: ROUTES_APLICATION.register.cfc,
        loadChildren: () => import('./cfc/cfc.module').then((m) => m.CfcModule),
        canActivate: [RulesGuard],
        data: {
          title: 'CFCs'
        }
      },
      {
        path: ROUTES_APLICATION.register.instructor,
        loadChildren: () => import('./instructor/instructor.module').then((m) => m.InstructorModule),
        canActivate: [RulesGuard],
        data: {
          title: 'Instrutores'
        }
      },
      {
        path: ROUTES_APLICATION.register.local,
        loadChildren: () => import('./local/local.module').then((m) => m.LocalModule),
        canActivate: [RulesGuard],
        data: {
          title: 'Locais'
        }
      },
      {
        path: ROUTES_APLICATION.register.enrollment,
        loadChildren: () => import('./enrollment/enrollment.module').then((m) => m.EnrollmentModule),
        canActivate: [RulesGuard],
        data: {
          title: 'Matricula'
        }
      },
      {
        path: ROUTES_APLICATION.register.user,
        loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
        canActivate: [RulesGuard],
        data: {
          title: 'Usuários',
        }
      },
      {
        path: ROUTES_APLICATION.register.vehicle,
        loadChildren: () => import('./vehicle/vehicle.module').then((m) => m.VehicleModule),
        canActivate: [RulesGuard],
        data: {
          title: 'Veículos',
        }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(registerRouter)],
  exports: [RouterModule],
})
export class RegisterRoutingModule { }
