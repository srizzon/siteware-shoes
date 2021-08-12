import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DiscountTypeEnum } from 'src/app/shared/models/discount-type.enum';
import { Product } from 'src/app/shared/models/product.model';
import { Promotion } from 'src/app/shared/models/promotion.model';
import { ProductStore } from 'src/app/shared/state/product-store';
import { PromotionStore } from 'src/app/shared/state/promotion-store';

@Component({
  selector: 'app-product-catalog-item',
  templateUrl: './product-catalog-item.component.html',
  styleUrls: ['./product-catalog-item.component.scss']
})
export class ProductCatalogItemComponent implements OnInit {

  promotions$: Observable<Promotion[]>;

  form: FormGroup;

  constructor(private productStore: ProductStore, private promotionStore: PromotionStore, private router: Router) {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      images: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      categories: new FormControl(null),
      discount: new FormControl(null),
      discountType: new FormControl(null),
      promotions: new FormControl(null),
    });

    this.promotions$ = this.promotionStore.selectState();
  }

  ngOnInit(): void {
  }

  addProduct() {
    console.log("addProduct")
    let product = new Product();
    product.title = this.form.get("title")?.value;
    product.price = this.form.get("price")?.value;
    product.images = this.form.get("images")?.value?.replace(/\s+/g, '').split(";");
    product.categories = this.form.get("categories")?.value;
    product.promotion = this.form.get("promotions")?.value;
    product.discount = this.form.get("discount")?.value;
    product.discountType = this.form.get("discountType")?.value;
    product.finalPrice = this.calculateFinalPrice(product);

    this.productStore.add(product);
    this.router.navigateByUrl("/admin");
  }

  calculateFinalPrice(product: Product) {
    if (product.discountType == DiscountTypeEnum.VALUE)
      return product.price - product.discount!;
    else if (product.discountType == DiscountTypeEnum.PERCENT)
      return product.price * (product.discount! / 100);

    return product.price;
  }

}
