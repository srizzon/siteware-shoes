import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CartComponent } from './pages/cart/cart.component';
import { NbBadgeModule, NbButtonModule, NbCardModule, NbIconModule, NbTooltipModule } from '@nebular/theme';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbBadgeModule,
    NbTooltipModule
  ]
})
export class CheckoutModule { }
