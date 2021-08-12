import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PRODUCTS } from 'src/app/core/mock/products';
import { Product } from 'src/app/shared/models/product.model';
import { ProductStore } from 'src/app/shared/state/product-store';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent implements OnInit {

  productList$: Observable<Product[]>;

  constructor(private productStore: ProductStore){
    this.productList$ = this.productStore.selectState();
  }

  ngOnInit(): void { }

  delete(id: number){
    this.productStore.delete(id);
  }

}
