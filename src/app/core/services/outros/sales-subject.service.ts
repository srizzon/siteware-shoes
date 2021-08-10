import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesSubjectService {

  /**
   * @description Subject para fechar a janela do dialog de venda. Quando finalizara  venda, emitir subject como true.
   *
   */
  private $_sales = new BehaviorSubject<boolean>(false);

  constructor() { }

  setSales(value: boolean) {
    this.$_sales.next(value);
  }

  getSales() {
    return this.$_sales.asObservable();
  }
}
