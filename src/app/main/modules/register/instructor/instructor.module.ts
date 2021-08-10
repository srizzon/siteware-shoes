import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '@components/components.module';
import { InstructorFormComponent } from './instructor-form/instructor-form.component';
import { InstructorPageComponent } from './instructor-page/instructor-page.component';
import { CoreModule } from '@core/core.module';
import { InstructorRoutingModule } from './instructor.routing.module';
@NgModule({
  declarations: [
    InstructorPageComponent,
    InstructorFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    RouterModule,
    InstructorRoutingModule
  ]
})
export class InstructorModule { }
