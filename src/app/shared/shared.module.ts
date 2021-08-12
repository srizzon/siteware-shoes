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

const MODULES = [
  NbLayoutModule,
  NbButtonModule,
  NbIconModule,
  NbBadgeModule
];

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, ...MODULES],
  exports: [HeaderComponent],
  providers: [ProductStore, PromotionStore]
})
export class SharedModule { }
