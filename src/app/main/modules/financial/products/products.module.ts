import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskModule } from 'ngx-mask';

import { ComponentsModule } from '@components/components.module';
import { CoreModule } from '@core/core.module';
import { ProductsRoutingModule } from './products.routing.module';
import { ProductsFormComponent } from './products-form/products-form.component';
import { ProductsPageComponent } from './products-page/products-page.component';

@NgModule({
  declarations: [
    ProductsFormComponent,
    ProductsPageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CoreModule,
    NgxCurrencyModule,
    NgxMaskModule.forRoot(),
    ProductsRoutingModule,
    RouterModule,
  ]
})
export class ProductsModule { }
