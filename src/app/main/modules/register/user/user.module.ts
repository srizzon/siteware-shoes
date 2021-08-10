import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserFormComponent } from './user-form/user-form.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserRoutingModule } from './user.routing.module';
import { ComponentsModule } from '@components/components.module';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    UserFormComponent,
    UserPageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    UserRoutingModule,
    RouterModule,
  ],
})
export class UserModule { }
