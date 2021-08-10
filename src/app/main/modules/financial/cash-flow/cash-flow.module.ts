import { CommonModule } from '@angular/common';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CashFlowPageComponent } from './cash-flow-page/cash-flow-page.component';
import { CashFlowRoutingModule } from './cash-flow.routing.module';
import { ComponentsModule } from '@components/components.module';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    CashFlowPageComponent
  ],
  imports: [
    CashFlowRoutingModule,
    CommonModule,
    ComponentsModule,
    CoreModule,
    NgxCurrencyModule,
    RouterModule,
  ],
})
export class CashFlowModule { }
