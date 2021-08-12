import { CartItem } from "./cart-item.model";

export class Cart {
    items: CartItem[];
    quantity: number;
    subTotal: number;
    total: number;
    totalDiscount: number;

    constructor(){
        this.items = [];
        this.subTotal = 0;
        this.total = 0;
        this.totalDiscount = 0;
        this.quantity = 0;
    }
};
