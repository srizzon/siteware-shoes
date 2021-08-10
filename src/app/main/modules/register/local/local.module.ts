import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@core/core.module';
import { ComponentsModule } from '@components/components.module';
import { LocalFormComponent } from './local-form/local-form.component';
import { LocalPageComponent } from './local-page/local-page.component';
import { LocalRoutingModule } from './local.routing.module';

@NgModule({
  declarations: [
    LocalFormComponent,
    LocalPageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    LocalRoutingModule,
    RouterModule,
  ],
})
export class LocalModule { }
