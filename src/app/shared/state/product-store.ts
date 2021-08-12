import { Injectable } from '@angular/core';
import { NgSimpleStateBaseStore } from 'ng-simple-state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PRODUCTS } from 'src/app/core/mock/products';
import { Product } from '../models/product.model';

export type ProductState = Array<Product>;

@Injectable()
export class ProductStore extends NgSimpleStateBaseStore<ProductState> {

  initialState(): ProductState {
    return PRODUCTS;
  }

  get(id: number): Observable<Product>{
    return this.selectState<Product>(state => state.find(x => x.id === id)!);
  }

  add(product: Product): void {
    this.setState(state =>  [...state, {...product, id: Date.now()}]);
  }

  update(product: Product): void {
    this.setState(state =>  state.map(item => item.id === product.id ? product : item));
  }

  delete(id: number): void {
    this.setState(state => state.filter(item => item.id !== id) );
  }
}