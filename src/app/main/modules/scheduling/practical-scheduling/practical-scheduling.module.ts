import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '@components/components.module';
import { CoreModule } from '@core/core.module';
import { PracticalCalendarComponent } from './vehicle-calendar/practical-calendar/practical-calendar.component';
import { PracticalCalendarHeaderComponent } from './vehicle-calendar/practical-calendar-header/practical-calendar-header.component';
import { PracticalSchedulingComponent } from './practical-scheduling/practical-scheduling.component';
import { PracticalSchedulingFormComponent } from './practical-scheduling-form/practical-scheduling-form.component';
import { PracticalSchedulingPageComponent } from './practical-scheduling-page/practical-scheduling-page.component';
import { PracticalSchedulingRoutingModule } from './practical-scheduling.routing.module';
import { VehicleDialogComponent } from './vehicle-calendar/vehicle-dialog/vehicle-dialog.component';

@NgModule({
  declarations: [
    PracticalSchedulingComponent,
    PracticalSchedulingFormComponent,
    PracticalCalendarComponent,
    PracticalSchedulingPageComponent,
    PracticalCalendarHeaderComponent,
    VehicleDialogComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    RouterModule,
    PracticalSchedulingRoutingModule,
    CalendarModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ]
})
export class PraticalSchedulingModule {}
