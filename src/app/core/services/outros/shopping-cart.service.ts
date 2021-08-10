import { MatriculaGestaoModel } from '@models/gestao/matricula-gestao.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private $cartSubject = new BehaviorSubject<any>([]);
  private cartShopping = [];
  private candidate: MatriculaGestaoModel = null;

  constructor() {}

  cart() {
    return this.$cartSubject.asObservable();
  }

  getCandidate(): MatriculaGestaoModel {
    return this.candidate;
  }

  getCart() {
    return this.cartShopping;
  }

  addCart(item, candidate) {
    if (this.candidate != candidate) {
      this.cartShopping = [];
    }
    this.cartShopping.push(item);
    this.candidate = candidate;
    this.$cartSubject.next(this.cartShopping);
  }

  addOne(item, candidate) {
    this.cartShopping = [];
    this.cartShopping.push(item);
    this.candidate = candidate;
    this.$cartSubject.next(this.cartShopping);
  }

  removeCart(item) {
    const index = this.cartShopping.findIndex(x => x.id == item.id);
    this.cartShopping.splice(index, 1);
    this.cartShopping = Object.assign([], this.cartShopping)
    this.$cartSubject.next(this.cartShopping);
  }

  resetCart() {
    this.candidate = null;
    this.cartShopping = [];
    this.$cartSubject.next(this.cartShopping);
  }

}
