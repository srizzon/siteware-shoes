import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbLayoutModule,
  NbButtonModule,
  NbIconModule,
  NbBadgeModule,
} from '@nebular/theme';

import { HeaderComponent } from './components/header/header.component';
import { ProductStore } from './state/product-store';
import { PromotionStore } from './state/promotion-store';
import { CartStore } from './state/cart-store';
import { RouterModule } from '@angular/router';
import { PriceWithDiscountComponent } from './components/price-with-discount/price-with-discount.component';

const MODULES = [
  NbLayoutModule,
  NbButtonModule,
  NbIconModule,
  NbBadgeModule,
  RouterModule
];

const COMPONENTS = [
  HeaderComponent,
  PriceWithDiscountComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ...MODULES],
  exports: [...COMPONENTS],
  providers: []
})
export class SharedModule { }
