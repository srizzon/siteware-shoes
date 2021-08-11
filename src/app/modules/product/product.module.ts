import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { NgxGlideModule } from 'ngx-glide';
import { NbBadgeModule, NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule } from '@nebular/theme';
import { ProductItemComponent } from './pages/product-item/product-item.component';


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
    NbLayoutModule
  ]
})
export class ProductModule { }
