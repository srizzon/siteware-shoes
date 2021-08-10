import { CommonModule } from '@angular/common';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommissioningFormComponent } from './commissioning-form/commissioning-form.component';
import { CommissioningPageComponent } from './commissioning-page/commissioning-page.component';
import { CommissioningRoutingModule } from './commissioning.routing.module';
import { ComponentsModule } from '@components/components.module';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    CommissioningFormComponent,
    CommissioningPageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    CommissioningRoutingModule,
    NgxCurrencyModule,
    RouterModule,
  ],
})
export class CommissioningModule { }
