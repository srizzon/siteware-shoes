import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@core/core.module';
import { ComponentsModule } from '@components/components.module';
import { FinancialComponent } from './financial.component';
import { FinancialRoutingModule } from './financial.routing.module';

@NgModule({
  declarations: [
    FinancialComponent,
  ],
  entryComponents: [
    FinancialComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    FinancialRoutingModule,
    RouterModule
  ]
})
export class FinancialModule { }
