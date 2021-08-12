import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { ProductStore } from 'src/app/shared/state/product/product-store';

@Component({
  selector: 'app-product-catalog-item',
  templateUrl: './product-catalog-item.component.html',
  styleUrls: ['./product-catalog-item.component.scss']
})
export class ProductCatalogItemComponent implements OnInit {

  constructor(private productStore: ProductStore, private router: Router) { }

  ngOnInit(): void {
  }

  addProduct(){
    setTimeout(() => {
      let product = new Product();
      product.id = 7;
      product.title = "Testando";
      product.price = 5;
      product.images = ["https://imgcentauro-a.akamaihd.net/900x900/96448302/kit-de-meias-sapatilha-oxer-com-3-pares-34-a-38-adulto-img.jpg"]

      this.productStore.add(product);
      this.router.navigateByUrl("/admin");
    }, 1000)
  }

}
