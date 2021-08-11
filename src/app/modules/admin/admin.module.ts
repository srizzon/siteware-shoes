import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductCatalogComponent } from './pages/product-catalog/product-catalog.component';
import { NbAlertModule, NbBadgeModule, NbButtonModule, NbCardModule, NbIconModule, NbListModule, NbPopoverModule, NbTreeGridModule } from '@nebular/theme';


@NgModule({
  declarations: [
    ProductCatalogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NbCardModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NbPopoverModule,
    NbTreeGridModule,
    NbBadgeModule,
    NbAlertModule
  ]
})
export class AdminModule { }
