import { Product } from "./product.model";

export class CartItem {
    product: Product;
    quantity: number;

    constructor(_product: Product, _quantity: number = 1){
        this.product = _product;
        this.quantity = _quantity;
    }
}