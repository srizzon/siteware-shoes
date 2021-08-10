import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from 'src/app/core/mock/products';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  products = PRODUCTS;

  constructor() { }

  ngOnInit(): void {
  }

}
