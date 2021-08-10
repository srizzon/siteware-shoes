import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AvailabilityManagementFormComponent } from './availability-management-form/availability-management-form.component';
import { AvailabilityManagementPageComponent } from './availability-management-page/availability-management-page.component';
import { AvailabilityManagementRoutingModule } from './availability-management.routing.module';
import { ComponentsModule } from '@components/components.module';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    AvailabilityManagementFormComponent,
    AvailabilityManagementPageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    RouterModule,
    AvailabilityManagementRoutingModule
  ]
})
export class AvailabilityManagementModule { }
