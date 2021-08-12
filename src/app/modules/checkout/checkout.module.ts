import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CartComponent } from './pages/cart/cart.component';
import { NbBadgeModule, NbButtonModule, NbCardModule, NbIconModule, NbTooltipModule } from '@nebular/theme';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbBadgeModule,
    NbTooltipModule
  ]
})
export class CheckoutModule { }
