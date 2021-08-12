import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PRODUCTS } from 'src/app/core/mock/products';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/adapters/unsubs-ondestroy.adapter';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  products = PRODUCTS;
  currentProduct: any;

  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.subs.add(this.route.params.subscribe(params => {
      this.currentProduct = this.products.find(p => p.id == params['id']);
    }));
  }

}
