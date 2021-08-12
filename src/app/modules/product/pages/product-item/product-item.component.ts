import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/adapters/unsubs-ondestroy.adapter';
import { CartItem } from 'src/app/shared/models/cart-item.model';
import { Cart } from 'src/app/shared/models/cart.model';
import { Product } from 'src/app/shared/models/product.model';
import { CartStore } from 'src/app/shared/state/cart-store';
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
  currentSize: number | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private productStore: ProductStore, private cartStore: CartStore) {
    super();
  }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;

    if(this.productId){
      this.subs.add(this.productStore.get(this.productId).subscribe(
        (result) => {
          this.currentProduct = result;
        }
      ));
    }
  }

  viewImage(image: string){
    this.currentImage = image;
  }

  changeCurrentSize(size: number){
    if(this.currentSize === size)
      this.currentSize = undefined;
    else
      this.currentSize = size;
  }

  addToCart(){
    let cart = this.cartStore.getCurrentState();
    let cartItem = new CartItem(this.currentProduct);

    if(cart.items.some(x => x.product == this.currentProduct))
      cart.items.map(x => x.product == this.currentProduct ? x.quantity++ : x);
    else
      cart.items.push(cartItem);
    
    this.cartStore.updateCart(cart);

    this.router.navigateByUrl("/checkout");
  }

}
