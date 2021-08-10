import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CfcDetailComponent } from './_components/cfc-detail/cfc-detail.component';
import { CfcFormComponent } from './cfc-form/cfc-form.component';
import { CfcInstructorComponent } from './_components/cfc-instructor/cfc-instructor.component';
import { CfcListComponent } from './cfc-list/cfc-list.component';
import { CfcPageComponent } from './cfc-page/cfc-page.component';
import { CfcRoutingModule } from './cfc.routing.module';
import { CfcVehicleComponent } from './_components/cfc-vehicle/cfc-vehicle.component';
import { ComponentsModule } from '@components/components.module';
import { CoreModule } from '@core/core.module';
import { DialogLinkVehicleComponent } from './_components/dialog-link-vehicle/dialog-link-vehicle.component';
import { DialogLinkInstructorComponent } from './_components/dialog-link-instructor/dialog-link-instructor.component';

@NgModule({
  declarations: [
    CfcFormComponent,
    CfcPageComponent,
    CfcListComponent,
    CfcVehicleComponent,
    CfcInstructorComponent,
    CfcDetailComponent,
    DialogLinkInstructorComponent,
    DialogLinkVehicleComponent
  ],
  imports: [
    CfcRoutingModule,
    CommonModule,
    ComponentsModule,
    CoreModule,
    RouterModule
  ]
})
export class CfcModule { }
