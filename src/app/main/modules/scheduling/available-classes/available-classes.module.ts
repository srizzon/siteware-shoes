import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@components/components.module';
import { NgxMaskModule } from 'ngx-mask';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AvailableClassesRoutingModule } from './available-classes.routing.module';
import { AvailableClassesDetailComponent } from './available-classes-detail/available-classes-detail.component';
import { AvailableClassesPageComponent } from './available-classes-page/available-classes-page.component';
import { ComponentsSchedullingModule } from './../_shared/componentes/components-schedulling.module';
import { CoreModule } from '@core/core.module';
@NgModule({
  declarations: [
    AvailableClassesPageComponent,
    AvailableClassesDetailComponent
  ],
  imports: [
    AvailableClassesRoutingModule,
    CommonModule,
    ComponentsModule,
    RouterModule,
    ComponentsSchedullingModule,
    CoreModule,
    NgxMaskModule.forRoot(),
  ],
})
export class AvailableClassesModule { }
