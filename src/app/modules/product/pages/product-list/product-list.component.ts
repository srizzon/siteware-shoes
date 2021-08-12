import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BANNERS } from 'src/app/core/mock/banner';
import { PRODUCTS } from 'src/app/core/mock/products';
import { Product } from 'src/app/shared/models/product.model';
import { ProductStore } from 'src/app/shared/state/product/product-store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  images = BANNERS;
  productList$: Observable<Product[]>;
  filterProducts = PRODUCTS;
  categoryType: string = '';

  constructor(route: ActivatedRoute, private productStore: ProductStore){
    this.productList$ = this.productStore.selectState();

    route.queryParams.subscribe(p => {
      this.categoryType = p.category;
      this.filter();
    });
  }

  ngOnInit(): void {
  }

  filter(){
    // if(this.categoryType){
    //   let test = this.products.filter(x => x.categories?.some((x) => x == this.categoryType));
    //   this.filterProducts = test;
    // } else
    //   this.filterProducts = this.products;
  }

}
