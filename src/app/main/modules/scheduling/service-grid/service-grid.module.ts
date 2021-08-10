import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { NgModule } from '@angular/core';

import { ComponentsModule } from '@components/components.module';
import { CoreModule } from '@core/core.module';
import { ServiceGridFormComponent } from './service-grid-form/service-grid-form.component';
import { ServiceGridPageComponent } from './service-grid-page/service-grid-page.component';
import { ServiceGridRoutingModule } from './service-grid.routing.module';

@NgModule({
  declarations: [
    ServiceGridFormComponent,
    ServiceGridPageComponent
  ],
  imports: [
    ServiceGridRoutingModule,
    CommonModule,
    ComponentsModule,
    RouterModule,
    CoreModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
  ]
})
export class ServicegridModule { }
