import { Product } from "./product.model";

export class CartItem {
    product: Product;
    quantity: number;
    size?: number;

    constructor(_product: Product, _size: number, _quantity: number = 1){
        this.product = _product;
        this.quantity = _quantity;
        this.size = _size;
    }
}