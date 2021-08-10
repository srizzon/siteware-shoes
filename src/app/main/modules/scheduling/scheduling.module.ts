import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '@components/components.module';
import { CoreModule } from '@core/core.module';
import { SchedulingComponent } from './scheduling.component';
import { SchedulingComponentService } from './_shared/services/scheduling-component.service';
import { SchedulingRoutingModule } from './scheduling.routing.module';
@NgModule({
  declarations: [
    SchedulingComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ComponentsModule,
    RouterModule,
    SchedulingRoutingModule,
  ],
  providers: [
    SchedulingComponentService
  ],
})
export class SchedulingModule { }
