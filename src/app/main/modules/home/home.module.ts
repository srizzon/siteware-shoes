import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotAllowedComponent } from './not-allowed/not-allowed.component';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@core/core.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeRoutingModule } from './home.routing.module';
import { HeaderMenuComponent } from './header-menu/header-menu.component';

@NgModule({
  declarations: [
    HomePageComponent,
    HeaderMenuComponent,
    NotAllowedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    CoreModule
  ]
})
export class HomeModule { }
