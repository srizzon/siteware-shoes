import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/adapters/unsubs-ondestroy.adapter';
import { CartItem } from 'src/app/shared/models/cart-item.model';
import { Cart } from 'src/app/shared/models/cart.model';
import { Product } from 'src/app/shared/models/product.model';
import { CartStore } from 'src/app/shared/state/cart-store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  cart$: Observable<Cart>;

  constructor(private cartStore: CartStore) {
    super();
  }

  ngOnInit(): void {
    this.cart$ = this.cartStore.selectState();
  }

  updateQuantity(operator: string, currentItem: CartItem){
    let updateQuantity = this.cartStore.getCurrentState();
    updateQuantity.items = updateQuantity.items.filter((item) => {
      if(item == currentItem)
        operator == 'minus' ? item.quantity-- : item.quantity++;

      if(item.quantity == 0)
        return false;

      return true;
    });

    this.cartStore.updateCart(updateQuantity);
  }

  deleteProduct(cartItem: CartItem){
    this.cartStore.deleteProduct(cartItem);
  }

  clear(){
    this.cartStore.restartState();
  }

}
