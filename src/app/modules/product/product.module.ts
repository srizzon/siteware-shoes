import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { NgxGlideModule } from 'ngx-glide';
import { NbBadgeModule, NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';


@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgxGlideModule,
    NbCardModule,
    NbBadgeModule,
    NbIconModule,
    NbButtonModule
  ]
})
export class ProductModule { }
