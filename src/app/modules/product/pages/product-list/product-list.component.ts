import { Component, OnInit } from '@angular/core';
import { BANNERS } from 'src/app/core/mock/banner';
import { PRODUCTS } from 'src/app/core/mock/products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  images = BANNERS;
  products = PRODUCTS;

}
