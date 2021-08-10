import { RouterModule } from '@angular/router';
import { VehicleRoutingModule } from './vehicle.routing.module';
import { CoreModule } from '@core/core.module';
import { ComponentsModule } from '@components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehiclePageComponent } from './vehicle-page/vehicle-page.component';


@NgModule({
  declarations: [
    VehicleFormComponent,
    VehiclePageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    VehicleRoutingModule,
    RouterModule,
  ],
})
export class VehicleModule { }
