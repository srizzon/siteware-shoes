import { DiscountTypeEnum } from "./discount-type.enum";
import { Promotion } from "./promotion.model";

export class Product {
    id: number;
    title: string;
    price: number;
    images: string[];
    categories?: string[];
    discount?: number;
    discountType?: DiscountTypeEnum;
    promotion?: Promotion[];
}