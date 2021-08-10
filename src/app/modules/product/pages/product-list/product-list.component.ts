import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  filterProducts = PRODUCTS;
  categoryType: string = '';

  constructor(route: ActivatedRoute){
    route.queryParams.subscribe(p => {
      this.categoryType = p.category;
      this.filter();
    });
  }

  filter(){
    if(this.categoryType){
      let test = this.products.filter(x => x.category.some((x) => x == this.categoryType));
      this.filterProducts = test;
    } else
      this.filterProducts = this.products;
  }

}
