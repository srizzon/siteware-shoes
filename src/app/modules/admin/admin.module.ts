import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductCatalogComponent } from './pages/product-catalog/product-catalog.component';
import { NbAlertModule, NbBadgeModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbPopoverModule, NbSelectModule, NbTreeGridModule } from '@nebular/theme';
import { ProductCatalogItemComponent } from './pages/product-catalog-item/product-catalog-item.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductCatalogComponent,
    ProductCatalogItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    NbFormFieldModule,
    NgxMaskModule    
  ]
})
export class AdminModule { }
