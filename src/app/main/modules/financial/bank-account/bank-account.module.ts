import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BankAccountFormComponent } from './bank-account-form/bank-account-form.component';
import { BankAccountPageComponent } from './bank-account-page/bank-account-page.component';
import { BankAccountRoutingModule } from './bank-account.routing.module';
import { ComponentsModule } from '@components/components.module';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    BankAccountFormComponent,
    BankAccountPageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    BankAccountRoutingModule,
    RouterModule,
  ],
})
export class BankAccountModule { }
