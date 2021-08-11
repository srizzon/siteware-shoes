import { DiscountTypeEnum } from "./discount-type.enum";
import { Promotion } from "./promotion.model";

export class Product {
    id: number;
    title: string;
    images: string[];
    categories: string[];
    price: number;
    discount: number;
    discountType: DiscountTypeEnum;
    promotion: Promotion[];
}