import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReleaseGroupTypesFormComponent } from './release-group-types-form/release-group-types-form.component';
import { ReleaseGroupTypesPageComponent } from './release-group-types-page/release-group-types-page.component';
import { ReleaseGroupTypesRoutingModule } from './release-group-types.routing.module';
import { ComponentsModule } from '@components/components.module';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    ReleaseGroupTypesFormComponent,
    ReleaseGroupTypesPageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    ReleaseGroupTypesRoutingModule,
    RouterModule,
  ],
})
export class ReleaseGroupTypesModule { }
