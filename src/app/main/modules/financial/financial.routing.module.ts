import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ApplicationModules } from '@enums/application-modules.enum';
import { FinancialComponent } from './financial.component';
import { menuConfig } from '@constants/menu.constants';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { RulesGuard } from '@core/guards/rules.guard';

const { icon, name } = menuConfig.find(({ id }) => id === ApplicationModules.FINANCIAL);

const financialRoutes: Routes = [
  {
    path: '',
    component: FinancialComponent,
    data: { icon, name },
    children: [
      {
        path: ROUTES_APLICATION.financial.audit,
        loadChildren: () => import('./audit-partner/audit-partner.module').then((m) => m.AuditPartnerModule),
        canActivate: [RulesGuard],
        data: {
          title: 'Auditoria de Parcerias'
        }
      },
      {
        path: ROUTES_APLICATION.financial.bankAccount,
        loadChildren: () => import('./bank-account/bank-account.module').then((m) => m.BankAccountModule),
        canActivate: [RulesGuard],
        data: {
          title: 'Conta Corrente'
        }
      },
      {
        path: ROUTES_APLICATION.financial.cashFlow,
        loadChildren: () => import('./cash-flow/cash-flow.module').then((m) => m.CashFlowModule),
        canActivate: [RulesGuard],
        data: {
          title: 'Fluxo de Caixa'
        }
      },
      {
        path: ROUTES_APLICATION.financial.commissioning,
        loadChildren: () => import('./commissioning/commissioning.module').then((m) => m.CommissioningModule),
        canActivate: [RulesGuard],
        data: {
          title: 'Comissionamento',
        },
      },
      {
        path: ROUTES_APLICATION.financial.contracts,
        loadChildren: () => import('./contracts/contracts.module').then((m) => m.ContractsModule),
        canActivate: [RulesGuard],
        data: {
          title: 'Contratos'
        }
      },
      {
        path: ROUTES_APLICATION.financial.products,
        loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule),
        canActivate: [RulesGuard],
        data: {
          title: 'Produtos'
        }
      },
      {
        path: ROUTES_APLICATION.financial.releaseGroupTypes,
        loadChildren: () => import('./release-group-types/release-group-types.module').then((m) => m.ReleaseGroupTypesModule),
        canActivate: [RulesGuard],
        data: {
          title: 'Tipos de Lançamento',
        },
      },
      {
        path: ROUTES_APLICATION.financial.releaseGroup,
        loadChildren: () => import('./group-release/group-release.module').then((m) => m.GroupReleaseModule),
        canActivate: [RulesGuard],
        data: {
          title: 'Grupos De Lançamento',
        }
      },
      {
        path: ROUTES_APLICATION.financial.enrollmentCredit,
        loadChildren: () => import('./enrollment-credit/enrollment-credit.module').then((m) => m.EnrollmentCreditModule),
        canActivate: [RulesGuard],
        data: {
          title: 'Créditos de Matrículas'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(financialRoutes)],
  exports: [RouterModule]
})
export class FinancialRoutingModule { }
