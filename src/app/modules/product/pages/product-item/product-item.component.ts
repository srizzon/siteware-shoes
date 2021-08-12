import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/adapters/unsubs-ondestroy.adapter';
import { Product } from 'src/app/shared/models/product.model';
import { ProductStore } from 'src/app/shared/state/product-store';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  productId: number;
  currentProduct: Product;
  currentImage: string;

  constructor(private route: ActivatedRoute, private productStore: ProductStore) {
    super();
  }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;

    if(this.productId){
      this.subs.add(this.productStore.get(this.productId).subscribe(
        (result) => {
          this.currentProduct = result!;
        }
      ));
    }
  }

  viewImage(image: string){
    this.currentImage = image;
  }

  addToCart(){

  }

}
