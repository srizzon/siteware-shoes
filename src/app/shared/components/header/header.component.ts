import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { CartStore } from '../../state/cart-store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartQuantity$: Observable<number>;

  constructor(private sidebarService: NbSidebarService, private cartStore: CartStore) { }

  ngOnInit(): void {
    this.cartQuantity$ = this.cartStore.selectQuantity();
  }

  toggle() {
    this.sidebarService.compact();
  }

}
