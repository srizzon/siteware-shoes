import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@components/components.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AvailabilityBlockingManagementFormComponent } from './availability-blocking-management-form/availability-blocking-management-form.component';
import { AvailabilityBlockingManagementPageComponent } from './availability-blocking-management-page/availability-blocking-management-page.component';
import { AvailabilityBlockingManagementRoutingModule } from './availability-blocking-management.routing.module';
import { AvailabilityBlockingManagementPlacesComponent } from './availability-blocking-management-places/availability-blocking-management-places.component';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    AvailabilityBlockingManagementFormComponent,
    AvailabilityBlockingManagementPageComponent,
    AvailabilityBlockingManagementPlacesComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    RouterModule,
    AvailabilityBlockingManagementRoutingModule,
  ]
})
export class AvailabilityBlockingManagementModule { }
