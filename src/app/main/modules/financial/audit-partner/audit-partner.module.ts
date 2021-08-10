import { CommonModule } from '@angular/common';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuditPartnerPageComponent } from './audit-partner-page/audit-partner-page.component';
import { AuditPartnerRoutingModule } from './audit-partner.routing.module';
import { ComponentsModule } from '@components/components.module';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    AuditPartnerPageComponent
  ],
  imports: [
    AuditPartnerRoutingModule,
    CommonModule,
    ComponentsModule,
    CoreModule,
    NgxCurrencyModule,
    RouterModule,
  ],
})
export class AuditPartnerModule { }
