import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@components/components.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CalendarComponent } from './appointment-calendar/calendar/calendar.component';
import { CalendarHeaderComponent } from './appointment-calendar/calendar-header/calendar-header.component';
import { CoreModule } from '@core/core.module';
import { PlacesDialogComponent } from './appointment-calendar/places-dialog/places-dialog.component';
import { SchedulingExamsComponent } from './scheduling-exams/scheduling-exams.component';
import { SchedulingExamsFormComponent } from './scheduling-exams-form/scheduling-exams-form.component';
import { SchedulingExamsPageComponent } from './scheduling-exams-page/scheduling-exams-page.component';
import { SchedulingExamsRoutingModule } from './scheduling-exams.routing.module';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarHeaderComponent,
    PlacesDialogComponent,
    SchedulingExamsComponent,
    SchedulingExamsFormComponent,
    SchedulingExamsPageComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    CalendarModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    SchedulingExamsRoutingModule,
    RouterModule,
  ]
})
export class ExamsModule { }
