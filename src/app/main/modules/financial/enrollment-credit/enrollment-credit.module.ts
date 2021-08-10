import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnrollmentCreditPageComponent } from './enrollment-credit-page/enrollment-credit-page.component';
import { EnrollmentCreditRoutingModule } from './enrollment-credit.routing.module';
import { ComponentsModule } from '@components/components.module';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    EnrollmentCreditPageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    EnrollmentCreditRoutingModule,
    RouterModule,
  ],
})
export class EnrollmentCreditModule { }
