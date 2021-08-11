import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductCatalogComponent } from './pages/product-catalog/product-catalog.component';
import { NbAlertModule, NbBadgeModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbPopoverModule, NbSelectModule, NbTreeGridModule } from '@nebular/theme';
import { ProductCatalogItemComponent } from './pages/product-catalog-item/product-catalog-item.component';


@NgModule({
  declarations: [
    ProductCatalogComponent,
    ProductCatalogItemComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NbLayoutModule,
    NbCardModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NbPopoverModule,
    NbTreeGridModule,
    NbBadgeModule,
    NbAlertModule,
    NbInputModule,
    NbSelectModule,
    NbFormFieldModule
  ]
})
export class AdminModule { }
