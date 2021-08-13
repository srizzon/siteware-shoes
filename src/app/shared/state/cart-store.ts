import { Injectable } from '@angular/core';
import { NgSimpleStateBaseStore } from 'ng-simple-state';
import { Cart } from '../models/cart.model';

@Injectable()
export class CartStore extends NgSimpleStateBaseStore<Cart> {

    protected initialState(): Cart {
        return new Cart();
    }

    selectQuantity() {
        return this.selectState(state => state.quantity);
    }

    updateCart(cart: Cart): void {
        this.updateAndCalculateCart(cart);
    }

    deleteProduct(productId: number): void {
        let deleteProduct = this.getCurrentState();
        deleteProduct.items = deleteProduct.items.filter(x => x.product.id !== productId);

        if (deleteProduct.items.length == 0)
            this.restartState();
        else {
            this.updateAndCalculateCart(deleteProduct);
        }
    }

    updateAndCalculateCart(cart: Cart) {

        if (!cart)
            cart = this.getCurrentState();

        cart.subTotal = 0;
        cart.total = 0;
        cart.totalDiscount = 0;
        cart.quantity = 0;

        if (cart.items && cart.items.length > 0) {
            cart.items.map((item) => {
                cart.subTotal = +Number(cart.total + ((item.product.finalPrice || item.product.price) * item.quantity)).toFixed(2);

                if (item.product.promotions?.some(x => x.id == 1) && (item.quantity % 2) == 0) {
                    //Leve 2 e pague 1
                    cart.total = +Number(cart.total + (item.product.finalPrice || (item.product.price * item.quantity) / 2)).toFixed(2);
                    cart.totalDiscount = +Number(cart.totalDiscount + (item.product.finalPrice || (item.product.price * item.quantity) / 2)).toFixed(2);

                    item.product.promotions.map(x => x.id == 1 ? x.isActive = true : x);
                } else if (item.product.promotions?.some(x => x.id == 2) && (item.quantity % 3) == 0) {
                    //3 e por R$10,00
                    cart.total = +Number(cart.total + 10 * (item.quantity / 3)).toFixed(2);
                    cart.totalDiscount = +Number(cart.totalDiscount + (item.product.price * item.quantity) - 10 * (item.quantity / 3)).toFixed(2);

                    item.product.promotions.map(x => x.id == 2 ? x.isActive = true : x);
                } else {
                    cart.total = +Number(cart.total + ((item.product.finalPrice || item.product.price) * item.quantity)).toFixed(2);

                    if (item.product.discount)
                        cart.totalDiscount = +Number(cart.totalDiscount + (item.product.price - item.product.finalPrice!) * item.quantity).toFixed(2);

                    item.product.promotions?.map(x => x.isActive = false);
                }

                cart.quantity = cart.quantity + item.quantity;

                return item;
            });
        }

        this.setState(state => cart);
    }
}