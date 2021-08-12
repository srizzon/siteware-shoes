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

  cart: Cart;

  constructor(private cartStore: CartStore) {
    super();
  }

  ngOnInit(): void {
    this.subs.add(this.cartStore.selectState().subscribe(
      (result: any) => {
        this.cart = result;
      }
    ));
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

  deleteProduct(product: Product){
    this.cartStore.deleteProduct(product.id);
  }

  clear(){
    this.cartStore.restartState();
  }

}
