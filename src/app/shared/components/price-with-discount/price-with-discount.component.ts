import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'price-with-discount',
  templateUrl: './price-with-discount.component.html',
  styleUrls: ['./price-with-discount.component.scss']
})
export class PriceWithDiscountComponent implements OnInit {

  @Input() product: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
