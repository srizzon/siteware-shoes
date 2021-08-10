import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '@components/components.module';
import { CoreModule } from '@core/core.module';
import { EnrollmentDataContractsComponent } from './enrollment-data-candidate/enrollment-data-contracts/enrollment-data-contracts.component';
import { EnrollmentDataCreditsComponent } from './enrollment-data-candidate/enrollment-data-credits/enrollment-data-credits.component';
import { EnrollmentDataPageComponent } from './enrollment-data-candidate/enrollment-data-page/enrollment-data-page.component';
import { EnrollmentDataProductsComponent } from './enrollment-data-candidate/enrollment-data-products/enrollment-data-products.component';
import { EnrollmentDataRegisterComponent } from './enrollment-data-candidate/enrollment-data-register/enrollment-data-register.component';
import { EnrollmentDataSchedulingComponent } from './enrollment-data-candidate/enrollment-data-scheduling/enrollment-data-scheduling.component';
import { EnrollmentFormComponent } from './enrollment-form/enrollment-form.component';
import { EnrollmentListComponent } from './enrollment-list/enrollment-list.component';
import { EnrollmentRoutingModule } from './enrollment.routing.module';


@NgModule({
  declarations: [
    EnrollmentListComponent,
    EnrollmentFormComponent,
    EnrollmentDataCreditsComponent,
    EnrollmentDataContractsComponent,
    EnrollmentDataPageComponent,
    EnrollmentDataProductsComponent,
    EnrollmentDataRegisterComponent,
    EnrollmentDataSchedulingComponent
  ],
  imports: [
    EnrollmentRoutingModule,
    CommonModule,
    ComponentsModule,
    CoreModule,
    RouterModule,
  ],
})
export class EnrollmentModule {}
