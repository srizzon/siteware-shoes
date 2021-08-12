import { DiscountTypeEnum } from "src/app/shared/models/discount-type.enum";
import { Product } from "src/app/shared/models/product.model";

export const PRODUCTS: Product[] = [
    {
        "id": 1,
        "title": "Tênis Nike Revolution 5 - Feminino",
        "images": [
            "https://imgcentauro-a.akamaihd.net/900x900/94290631/tenis-nike-revolution-5-feminino-img.jpg",
            "https://imgcentauro-a.akamaihd.net/900x900/94290631A1/tenis-nike-revolution-5-feminino-img.jpg",
            "https://imgcentauro-a.akamaihd.net/900x900/94290631A4/tenis-nike-revolution-5-feminino-img.jpg"
        ],
        "categories": [
            "shoes"
        ],
        "price": 249.99,
        "discount": 100,
        "discountType": DiscountTypeEnum.VALUE,
        "finalPrice": 149.99,
        "promotions": [
            {
                "id": 1,
                "title": "Leve 2 e pague 1",
                "status": "danger",
                "description": "Na compra 2 produtos iguais pague por apenas 1"
            }
        ]
    },
    {
        "id": 2,
        "title": "Tênis Asics Patriot 12 Noosa - Masculino",
        "images": [
            "https://imgcentauro-a.akamaihd.net/900x900/95077714/tenis-asics-patriot-12-noosa-masculino-img.jpg",
            "https://imgcentauro-a.akamaihd.net/900x900/95077714A1/tenis-asics-patriot-12-noosa-masculino-img.jpg",
            "https://imgcentauro-a.akamaihd.net/900x900/95077714A7/tenis-asics-patriot-12-noosa-masculino-img.jpg"
        ],
        "categories": [
            "shoes"
        ],
        "price": 449.99,
        "discount": 50,
        "discountType": DiscountTypeEnum.PERCENT,
        "finalPrice": 224.99,
        "promotions": [
            {
                "id": 1,
                "title": "Leve 2 e pague 1",
                "status": "danger",
                "description": "Na compra 2 produtos iguais pague por apenas 1"
            }
        ]
    },
    {
        "id": 3,
        "title": "Tênis Mizuno Wave Prophecy X - Masculino",
        "images": [
            "https://imgcentauro-a.akamaihd.net/900x900/95707805/tenis-mizuno-wave-prophecy-x-masculino-img.jpg",
            "https://imgcentauro-a.akamaihd.net/900x900/95707858A1/tenis-mizuno-wave-prophecy-x-masculino-img.jpg",
            "https://imgcentauro-a.akamaihd.net/900x900/95707858A7/tenis-mizuno-wave-prophecy-x-masculino-img.jpg"
        ],
        "categories": [
            "shoes"
        ],
        "price": 449.99
    },
    {
        "id": 5,
        "title": "Kit de Meias Sapatilha Oxer - Adulto",
        "images": [
            "https://imgcentauro-a.akamaihd.net/900x900/96448302/kit-de-meias-sapatilha-oxer-com-3-pares-34-a-38-adulto-img.jpg",
            "https://imgcentauro-a.akamaihd.net/900x900/96448302A1/kit-de-meias-sapatilha-oxer-com-3-pares-34-a-38-adulto-img.jpg",
            "https://imgcentauro-a.akamaihd.net/900x900/96448302A8/kit-de-meias-sapatilha-oxer-com-3-pares-34-a-38-adulto-img.jpg"
        ],
        "categories": [
            "socks"
        ],
        "price": 3.99,
        "promotions": [
            {
                "id": 2,
                "title": "3 por R$10,00",
                "status": "warning",
                "description": "Pague R$10,00 na compra de 3 produtos iguais"
            }
        ]
    },
    {
        "id": 6,
        "title": "Kit de Meias Nike Everyday - Adulto",
        "images": [
            "https://imgcentauro-a.akamaihd.net/900x900/93221001/kit-de-meias-nike-everyday-cushion-ankle-com-3-pares-adulto-img.jpg",
            "https://imgcentauro-a.akamaihd.net/900x900/93221001A1/kit-de-meias-nike-everyday-cushion-ankle-com-3-pares-adulto-img.jpg",
            "https://imgcentauro-a.akamaihd.net/900x900/93221001A2/kit-de-meias-nike-everyday-cushion-ankle-com-3-pares-adulto-img.jpg"
        ],
        "categories": [
            "socks"
        ],
        "price": 3.99,
        "promotions": [
            {
                "id": 2,
                "title": "3 por R$10,00",
                "status": "warning",
                "description": "Pague R$10,00 na compra de 3 produtos iguais"
            }
        ]
    },

]