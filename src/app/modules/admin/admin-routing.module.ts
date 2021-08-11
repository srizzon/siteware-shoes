import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCatalogItemComponent } from './pages/product-catalog-item/product-catalog-item.component';
import { ProductCatalogComponent } from './pages/product-catalog/product-catalog.component';

const routes: Routes = [
  {
    path: '',
    component: ProductCatalogComponent
  },
  {
    path: 'new',
    component: ProductCatalogItemComponent
  },
  {
    path: ':id',
    component: ProductCatalogItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
