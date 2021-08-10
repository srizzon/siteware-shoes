import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '@components/components.module';
import { ContractsRoutingModule } from './contracts.routing.module';
import { ContractsPageComponent } from './contracts-page/contracts-page.component';
import { ContractsFormComponent } from './contracts-form/contracts-form.component';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    ContractsPageComponent,
    ContractsFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ContractsRoutingModule,
    CoreModule,
    NgxCurrencyModule,
    NgxMaskModule.forRoot(),
    RouterModule,
  ]
})
export class ContractsModule { }
