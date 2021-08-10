import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AddCandidateToClassRoutingModule } from './add-candidate-to-class.routing.module';
import { ClassPageComponent } from './class-page/class-page.component';
import { ComponentsModule } from '@components/components.module';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    ClassPageComponent,
  ],
  imports: [
    AddCandidateToClassRoutingModule,
    CommonModule,
    ComponentsModule,
    RouterModule,
    CoreModule,
    NgxMaskModule.forRoot(),
  ],
})
export class AddCandidateToClassModule { }
