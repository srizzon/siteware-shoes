import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { SIZES } from 'src/app/core/mock/sizes';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/adapters/unsubs-ondestroy.adapter';
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
export class ProductCatalogItemComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  form: FormGroup;

  productId: number;
  product: Product;
  promotions: Promotion[];
  sizes = SIZES;

  constructor(private productStore: ProductStore, private promotionStore: PromotionStore, private router: Router, private route: ActivatedRoute, private toastrService: NbToastrService) {
    super();

    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      images: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      categories: new FormControl(null),
      discount: new FormControl(null),
      discountType: new FormControl(null),
      promotions: new FormControl(null),
      sizes: new FormControl(null),
    });

    this.subs.add(this.promotionStore.selectState().subscribe((result: any) => {
      this.promotions = result;
    }));
  }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;

    if (this.productId) {
      this.productStore.get(this.productId).subscribe(
        (result) => {
          this.form.patchValue({
            title: result?.title,
            price: result?.price,
            images: result?.images.join(";"),
            description: result?.description,
            categories: result?.categories,
            discount: result?.discount,
            discountType: result?.discountType,
            promotions: result?.promotions?.map(x => x.id),
            sizes: result?.sizes,
          });
        }
      );
    }
  }

  async submit() {
    let product = await this.formToProduct();

    if (this.productId){
      this.productStore.update(product);
      this.toastrService.success("", "Produto atualizado com sucesso!");
    }
    else{
      this.productStore.add(product);
      this.toastrService.success("", "Produto criado com sucesso!");
    }

    this.router.navigateByUrl("/admin");
  }

  async formToProduct() {
    let product = new Product();
    product.id = this.productId;
    product.title = this.form.get("title")?.value;
    product.price = this.form.get("price")?.value;
    product.images = this.form.get("images")?.value?.replace(/\s+/g, '').split(";");
    product.description = this.form.get("description")?.value;
    product.categories = this.form.get("categories")?.value;
    product.discount = this.form.get("discount")?.value;
    product.discountType = this.form.get("discountType")?.value;
    product.promotions = this.promotions.filter(x => this.form.get("promotions")?.value?.includes(x.id));
    product.finalPrice = this.calculateFinalPrice(product);
    product.sizes = this.form.get("sizes")?.value;

    return product;
  }

  calculateFinalPrice(product: Product) {
    if (product.discountType == DiscountTypeEnum.VALUE)
      return product.price - product.discount!;
    else if (product.discountType == DiscountTypeEnum.PERCENT)
      return product.price * (product.discount! / 100);

    return undefined;
  }

}
