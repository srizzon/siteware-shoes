import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { NgxGlideModule } from 'ngx-glide';
import { NbAlertModule, NbBadgeModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule, NbTooltipModule } from '@nebular/theme';
import { ProductItemComponent } from './pages/product-item/product-item.component';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
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
