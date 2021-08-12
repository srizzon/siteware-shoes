import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BANNERS } from 'src/app/core/mock/banner';
import { PRODUCTS } from 'src/app/core/mock/products';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/adapters/unsubs-ondestroy.adapter';
import { DiscountTypeEnum } from 'src/app/shared/models/discount-type.enum';
import { Product } from 'src/app/shared/models/product.model';
import { ProductStore } from 'src/app/shared/state/product-store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  images = BANNERS;
  productList$: Observable<Product[]>;
  filterProducts$: Observable<Product[]>;

  constructor(route: ActivatedRoute, private productStore: ProductStore){
    super();

    this.productList$ = this.productStore.selectState();
    this.subs.add(route.queryParams.subscribe(p => {
      this.filter(p.category);
    }));
  }

  ngOnInit(): void {
  }

  priceWithDiscount(product: Product){
    if(product.discountType == DiscountTypeEnum.VALUE)
      return product.price - product.discount!;
    else if(product.discountType == DiscountTypeEnum.PERCENT) {
      let final = product.price * ((product.discount || 100) / 100);
      console.log(final);
      return final;
    }

    return product.price;
  }

  filter(categoryType: string){
    if(categoryType){
      this.filterProducts$ = this.productList$.pipe(
        map(result =>
          result.filter(x => x.categories?.some((x) => x == categoryType))
        )
      );
    } else
      this.filterProducts$ = this.productList$;
  }

}
