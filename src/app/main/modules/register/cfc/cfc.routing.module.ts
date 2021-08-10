import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CfcFormComponent } from './cfc-form/cfc-form.component';
import { CfcListComponent } from './cfc-list/cfc-list.component';
import { CfcPageComponent } from './cfc-page/cfc-page.component';
import { CfcPorCnpjResolver } from '@services/apis/gestao/resolvers/cfc-por-cnpj.resolver';
import { InstrutorCfcResolver } from '@services/apis/gestao/resolvers/instrutor-cfc.resolver';
import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { VeiculoCfcResolver } from '@services/apis/gestao/resolvers/veiculo-cfc.resolver';

const cfcRoutes: Routes = [
  {
    path: '',
    component: CfcListComponent,
    data: {
      header: {
        title: `Consulta CFC's Cadastrados`,
        text: `Aqui você pode visualizar as <strong>CFC's cadastrados</strong> e tembém fazer o <strong>gerencimanto</strong> destas.</span>`
      }
    },
  },
  {
    path: ROUTES_APLICATION.add,
    component: CfcFormComponent,
    data: {
      header: {
        title: 'Candastro de CFC',
        text: 'Aqui você pode realizar o <strong>cadastro de uma CFC</strong>, basta apenas preencher os campos abaixo.</span>'
      }
    }
  },
  {
    path: `${ROUTES_APLICATION.detail}/:cnpj`,
    component: CfcPageComponent,
    data: {
      header: {
        title: 'Gestão de CFC',
        text: 'Aqui você consegue visualizar todos os dados referente ao CFC. Visualizar ou associar instrutores e seus veículos. Podendo também editar seus dados.</span>'
      }
    },
    resolve: {
      cfc: CfcPorCnpjResolver,
      instructors: InstrutorCfcResolver,
      vehicles: VeiculoCfcResolver
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(cfcRoutes)],
  exports: [RouterModule]
})
export class CfcRoutingModule { }
