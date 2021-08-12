import { Injectable } from '@angular/core';
import { NgSimpleStateBaseStore } from 'ng-simple-state';
import { PRODUCTS } from 'src/app/core/mock/products';
import { Product } from '../../models/product.model';

export type ProductState = Array<Product>;

@Injectable()
export class ProductStore extends NgSimpleStateBaseStore<ProductState> {

  initialState(): ProductState {
    return PRODUCTS;
  }

  add(product: Omit<Product, 'id'>): void {
    this.setState(state =>  [...state, {...product, id: Date.now()}]);
  }

  delete(id: number): void {
    this.setState(state => state.filter(item => item.id !== id) );
  }

  setComplete(id: number, completed: boolean = true): void {
    this.setState(state => state.map(item => item.id === id ? {...item, completed} : item) );
  }
}