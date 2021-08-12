import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { NgxGlideModule } from 'ngx-glide';
import { NbAlertModule, NbBadgeModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule, NbTooltipModule } from '@nebular/theme';
import { ProductItemComponent } from './pages/product-item/product-item.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgxGlideModule,
    NbCardModule,
    NbBadgeModule,
    NbIconModule,
    NbButtonModule,
    NbLayoutModule,
    NbAlertModule,
    NbTooltipModule,
    NbSelectModule,
    NbInputModule,
    NbFormFieldModule,
    NgxMaskModule
  ]
})
export class ProductModule { }
