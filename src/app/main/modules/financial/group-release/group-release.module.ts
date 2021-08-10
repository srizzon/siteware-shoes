import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '@components/components.module';
import { CoreModule } from '@core/core.module';
import { GroupReleaseFormComponent } from './group-release-form/group-release-form.component';
import { GroupReleasePageComponent } from './group-release-page/group-release-page.component';
import { GroupReleaseRoutingModule } from './group-release.routing.module';

@NgModule({
  declarations: [
    GroupReleasePageComponent,
    GroupReleaseFormComponent
  ],
  imports: [
    CommonModule,
    GroupReleaseRoutingModule,
    ComponentsModule,
    CoreModule,
    RouterModule
  ]
})
export class GroupReleaseModule { }
