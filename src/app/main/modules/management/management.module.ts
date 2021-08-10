import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ComponentsModule } from '@components/components.module';
import { CoreModule } from '@core/core.module';
import { ManagementComponent } from './management.component';
import { ManagementRoutingModule } from './management.routing.module';
@NgModule({
  declarations: [
    ManagementComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    RouterModule,
    ManagementRoutingModule,

  ]
})
export class ManagementModule { }
