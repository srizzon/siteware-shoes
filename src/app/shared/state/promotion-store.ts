import { Injectable } from '@angular/core';
import { NgSimpleStateBaseStore } from 'ng-simple-state';
import { Observable } from 'rxjs';
import { PROMOTIONS } from 'src/app/core/mock/promotions';
import { Promotion } from '../models/promotion.model';

export type PromotionState = Array<Promotion>;

@Injectable()
export class PromotionStore extends NgSimpleStateBaseStore<PromotionState> {

  initialState(): PromotionState {
    return PROMOTIONS;
  }

  add(product: Omit<Promotion, 'id'>): void {
    this.setState(state =>  [...state, {...product, id: Date.now()}]);
  }

  delete(id: number): void {
    this.setState(state => state.filter(item => item.id !== id) );
  }
}