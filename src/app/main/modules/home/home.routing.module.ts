import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotAllowedComponent } from './not-allowed/not-allowed.component';

import { HomePageComponent } from './home-page/home-page.component';
import { ROUTES_APLICATION } from '@core/constants/routes-aplication.constants';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: `${ROUTES_APLICATION.notAllowed}`,
    component: NotAllowedComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
