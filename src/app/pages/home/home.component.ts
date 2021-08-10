import { Component, OnInit } from '@angular/core';
import { BANNERS } from '../../core/mock/banner';
import { PRODUCTS } from '../../core/mock/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images = BANNERS;
  products = PRODUCTS;

  constructor() { }

  ngOnInit(): void {
  }

}
