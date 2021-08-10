import { RouterModule } from '@angular/router';
import { RegisterRoutingModule } from './register.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@core/core.module';
import { ComponentsModule } from '@components/components.module';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RegisterRoutingModule,
    RouterModule,
    CoreModule,
  ],
})
export class RegisterModule { }
