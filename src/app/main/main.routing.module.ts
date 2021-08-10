import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CfcResolver } from '@services/apis/gestao/resolvers/cfc.resolver';
import { CfcAgendamentoResolver } from '@services/apis/agendamento/resolvers/cfc-agendamento.resolver';
import { CursoAgendamentoResolver } from '@services/apis/agendamento/resolvers/curso-agendamento.resolver';
import { InstrutorAgendamentoResolver } from '@services/apis/agendamento/resolvers/instrutor-agendamento.resolver';
import { InstrutorResolver } from '@services/apis/gestao/resolvers/instrutor.resolver';
import { LocalResolver } from '@services/apis/gestao/resolvers/local.resolver';
import { MainComponent } from './main.component';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { RulesGuard } from '@core/guards/rules.guard';
import { ServicoAgendamentoResolver } from '@services/apis/agendamento/resolvers/servico-agendamento.resolver';
import { ServicosGestaoResolver } from '@services/apis/gestao/resolvers/servicos-gestao.resolver';
import { TipoExameResolver } from '@services/apis/gestao/resolvers/tipo-exame.resolver';
import { UnidadeDetranResolver } from '@services/apis/gestao/resolvers/unidade-detran.resolver';
import { VeiculoResolver } from '@services/apis/gestao/resolvers/veiculo.resolver';

const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    resolve: {
      cfcs: CfcResolver,
      servicos: ServicosGestaoResolver,
      instrutores: InstrutorResolver,
      unidadeDetran: UnidadeDetranResolver,
      veiculos: VeiculoResolver,
      locais: LocalResolver,
      tipoExames: TipoExameResolver,
      cfcsAgendamento: CfcAgendamentoResolver,
      instrutoresAgendamento: InstrutorAgendamentoResolver,
      cursosAgendamento: CursoAgendamentoResolver,
      servicosAgendamento: ServicoAgendamentoResolver
    },
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: ROUTES_APLICATION.schedule.path,
        loadChildren: () => import('./modules/scheduling/scheduling.module').then(m => m.SchedulingModule),
        canActivate: [RulesGuard]
      },
      {
        path: ROUTES_APLICATION.register.path,
        loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule),
        canActivate: [RulesGuard]
      },
      {
        path: ROUTES_APLICATION.financial.path,
        loadChildren: () => import('./modules/financial/financial.module').then(m => m.FinancialModule),
        canActivate: [RulesGuard]
      },
      {
        path: ROUTES_APLICATION.home,
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
        canActivate: [RulesGuard]
      },
      {
        path: ROUTES_APLICATION.management.path,
        loadChildren: () => import('./modules/management/management.module').then(m => m.ManagementModule),
        canActivate: [RulesGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
