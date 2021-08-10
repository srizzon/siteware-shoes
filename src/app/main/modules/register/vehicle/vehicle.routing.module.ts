import { VeiculoResolver } from '@services/apis/gestao/resolvers/veiculo.resolver';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehiclePageComponent } from './vehicle-page/vehicle-page.component';

const routes: Routes = [
  {
    path: '',
    component: VehiclePageComponent,
    data: {
      header: {
        title: 'Consulta de Veículos Cadastrados',
        text: 'Aqui você consegue visualizar os veículos <strong>cadastrados</strong>.'
      }
    }
  },
  {
    path: ROUTES_APLICATION.add,
    component: VehicleFormComponent,
    data: {
      header: {
        title: 'Cadastrar Veículo',
        text: 'Para cadastrar um veículo, você deve <strong>informar os dados </strong> e clicar em adicionar.'
      }
    }
  },
  {
    path: `${ROUTES_APLICATION.detail}/:id`,
    component: VehicleFormComponent,
    data: {
      header: {
        title: 'Editar Veículo',
        text: 'Para editar um veículo, você pode <strong>informar os dados </strong> que deseja atualizar e clicar em salvar.'
      }
    },
    resolve: {
      vehicle: VeiculoResolver
    }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
