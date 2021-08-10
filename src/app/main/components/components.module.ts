import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxCurrencyModule } from 'ngx-currency';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@core/core.module';
import { COMPONENTS } from './_componentes';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({
  declarations: [
    COMPONENTS
  ],
  exports: [
    COMPONENTS
  ],
  entryComponents: [
    COMPONENTS
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ImageCropperModule,
    NgxCurrencyModule,
    RouterModule,
  ]
})
export class ComponentsModule { }
