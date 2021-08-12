import { CartItem } from "./cart-item.model";

export class Cart {
    items: CartItem[];
    quantity: number = 0;
    subTotal: number = 0;
    total: number = 0;
    totalDiscount: number = 0;

    constructor(){
        this.items = [];
    }
};
