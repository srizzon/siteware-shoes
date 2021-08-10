import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';

import { NbBadgeModule, NbButtonModule, NbCardModule, NbIconComponent, NbIconModule, NbLayoutModule, NbListModule, NbMenuModule, NbSidebarModule } from '@nebular/theme';
import { SharedModule } from '../shared/shared.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NgxGlideModule } from 'ngx-glide';
import { CrudComponent } from './crud/crud.component';


@NgModule({
  declarations: [
    HomeComponent,
    CrudComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NbMenuModule,
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbListModule,
    NbBadgeModule,
    NgxGlideModule,
    SharedModule
  ]
})
export class PagesModule { }
