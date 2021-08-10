import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ROUTES_APLICATION } from '@constants/routes-aplication.constants';
import { UsuarioPorIdResolver } from '@services/apis/identidade/resolvers/usuario-por-id-resolver';
import { UserFormComponent } from './user-form/user-form.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserPageComponent,
    data: {
      header: {
        title: 'Consulta de Usuários Cadastrados',
        text: 'Aqui você consegue visualizar os usuários que <strong>possuem cadastro</strong> vinculados ao CFC.'
      }
    },
  },
  {
    path: ROUTES_APLICATION.add,
    component: UserFormComponent,
    data: {
      header: {
        title: 'Cadastrar Usuarios',
        text: 'Para cadastrar um usuário, você deve <strong>informar os dados </strong> e clicar em salvar.'
      }
    }
  },
  {
    path: `${ROUTES_APLICATION.detail}/:id`,
    component: UserFormComponent,
    data: {
      header: {
        title: 'Editar Usuarios',
        text: 'Para editar um usuário, você pode <strong>informar os dados </strong> que deseja atualizar e clicar em salvar.'
      }
    },
    resolve: {
      user: UsuarioPorIdResolver
    }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
