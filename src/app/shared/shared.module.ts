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

const MODULES = [
  NbLayoutModule,
  NbButtonModule,
  NbIconModule,
  NbBadgeModule,
  RouterModule
];

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, ...MODULES],
  exports: [HeaderComponent],
  providers: [ProductStore, PromotionStore, CartStore]
})
export class SharedModule { }
