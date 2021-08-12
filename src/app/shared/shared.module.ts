import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbLayoutModule,
  NbButtonModule,
  NbIconModule,
  NbBadgeModule,
} from '@nebular/theme';

import { HeaderComponent } from './components/header/header.component';
import { ProductStore } from './state/product/product-store';

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
  providers: [ProductStore]
})
export class SharedModule { }
