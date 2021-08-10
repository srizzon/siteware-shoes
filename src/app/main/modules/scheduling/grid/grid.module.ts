import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GridFormComponent } from './grid-form/grid-form.component';
import { ComponentsModule } from '@components/components.module';
import { ComponentsSchedullingModule } from './../_shared/componentes/components-schedulling.module';
import { CoreModule } from '@core/core.module';
import { GridPageComponent } from './grid-page/grid-page.component';
import { GridRoutingModule } from './grid.routing.module';

@NgModule({
  declarations: [
    GridFormComponent,
    GridPageComponent,
  ],
  imports: [
    GridRoutingModule,
    CommonModule,
    ComponentsSchedullingModule,
    ComponentsModule,
    RouterModule,
    CoreModule,
    NgxMaskModule.forRoot(),
  ]
 })
export class GridModule { }
