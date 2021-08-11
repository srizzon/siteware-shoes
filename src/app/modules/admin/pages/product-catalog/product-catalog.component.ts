import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from 'src/app/core/mock/products';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent implements OnInit {

  products = PRODUCTS;

  constructor() { }

  ngOnInit(): void { }

  delete(id: number){
    //Change state
    this.products = this.products.filter((p) => {
      return p.id != id;
    });
  }

}
