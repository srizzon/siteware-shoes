import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxCurrencyModule } from 'ngx-currency';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@core/core.module';
import { COMPONENTS_SCHEDULLING } from './_components-schedulling';

@NgModule({
  declarations: [
    COMPONENTS_SCHEDULLING
  ],
  exports: [
    COMPONENTS_SCHEDULLING
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    NgxCurrencyModule,
    RouterModule,
  ]
})
export class ComponentsSchedullingModule { }
