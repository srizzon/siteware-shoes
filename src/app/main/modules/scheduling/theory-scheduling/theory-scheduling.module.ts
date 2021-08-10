import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

import { ComponentsModule } from '@components/components.module';
import { ComponentsSchedullingModule } from './../_shared/componentes/components-schedulling.module';
import { CoreModule } from '@core/core.module';
import { TheorySchedulingFormComponent } from './theory-scheduling-form/theory-scheduling-form.component';
import { TheorySchedulingPageComponent } from './theory-scheduling-page/theory-scheduling-page.component';
import { TheorySchedulingRoutingModule } from './theory-scheduling.routing.module';

@NgModule({
  declarations: [
    TheorySchedulingPageComponent,
    TheorySchedulingFormComponent,
  ],
  imports: [
    TheorySchedulingRoutingModule,
    CommonModule,
    ComponentsModule,
    ComponentsSchedullingModule,
    RouterModule,
    CoreModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
  ]
})
export class TheorySchedulingModule { }
