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
        "description": "Versátil e ultraconfortável para a academia, treinos leves de corrida, caminhada ou mesmo ocasiões casuais, o Tênis Nike Revolution 5 é a pedida certa para a mulher dinâmica e moderna. Seu cabedal (parte superior do tênis) apresenta a leveza e respirabilidade da malha mantém o frescor e flexibilidade dos movimentos. Na entressola, a inserção da espuma em toda a extensão garante uma pisada macia e suave com leve amortecimento. Já o solado do Nike Revolution 5 Feminino oferece excelente tração e uma distribuição natural das passadas. Não perca a oportunidade e aproveite o preço para comprar!",
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
        ],
        "sizes": [
            35,
            36,
            37,
            40
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
        "description": "Versátil para academia, caminhada, treinos leves de corrida ou mesmo na casualidade dos compromissos, o Asics Patriot 12 Noosa é um ótimo custo-benefício. Sua estrutura é leve e respirável em mesh (malha em tramas abertas) para mais flexibilidade aos movimentos e frescor duradouro. No colar do calcanhar, o reforço acolchoado oferece proteção contra o atrito de contato. Já a entressola de EVA garante maciez, leveza e amortecimento duradouro com um visual colorido que valoriza o modelo. Além disso, o solado garante a aderência necessária na superfície. Aproveite o ótimo preço e corra para comprar o seu!",
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
        ],
        "sizes": [
            35,
            36,
            37,
            40
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
        "description": "É o aliado, diário para os seus treinos de alta performance, esse tênis Mizuno Wave Prophecy X. O cabedal (parte superior do calçado) em tecido com tramas abertas oferece mais elasticidade e suporte aos pés. Entressola em EVA conta com a nova placa Infinity Wave totalmente redesenhada com cortes estratégicos nos pontos de flexão do pé. Agora ela está 40% mais flexível e com 26% mais amortecimento. Corra e garanta seu tênis hoje e sinta a sensação que só a Mizuno tem a te oferecer!",
        "categories": [
            "shoes"
        ],
        "price": 449.99,
        "sizes": [
            35,
            36,
            37,
            40
        ]
    },
    {
        "id": 5,
        "title": "Kit de Meias Sapatilha Oxer - Adulto",
        "images": [
            "https://imgcentauro-a.akamaihd.net/900x900/96448302/kit-de-meias-sapatilha-oxer-com-3-pares-34-a-38-adulto-img.jpg",
            "https://imgcentauro-a.akamaihd.net/900x900/96448302A1/kit-de-meias-sapatilha-oxer-com-3-pares-34-a-38-adulto-img.jpg",
            "https://imgcentauro-a.akamaihd.net/900x900/96448302A8/kit-de-meias-sapatilha-oxer-com-3-pares-34-a-38-adulto-img.jpg"
        ],
        "description": "Sinta-se confortável em todos os momentos, com esse kit de meias adulto, é a opção ideal. Confeccionada em materiais resistentes, oferece maciez e bem-estar duradouro. Já o arco do pé conta com design canelado que evita o deslocamento da meia e maior suporte. Além disso, a sola macia proporciona leveza e amortecimento aos seus pés. Não perca a oportunidade e garanta já o seu kit!",
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
        ],
    },
    {
        "id": 6,
        "title": "Kit de Meias Nike Everyday - Adulto",
        "images": [
            "https://imgcentauro-a.akamaihd.net/900x900/93221001/kit-de-meias-nike-everyday-cushion-ankle-com-3-pares-adulto-img.jpg",
            "https://imgcentauro-a.akamaihd.net/900x900/93221001A1/kit-de-meias-nike-everyday-cushion-ankle-com-3-pares-adulto-img.jpg",
            "https://imgcentauro-a.akamaihd.net/900x900/93221001A2/kit-de-meias-nike-everyday-cushion-ankle-com-3-pares-adulto-img.jpg"
        ],
        "description": "Confeccionada com materiais resistentes e confortáveis, o kit de meias Everyday Cushion Ankle possui Dri-Fit, uma tecnologia que garante mais respirabilidade durante o uso. Sua sola é macia e atoalhada, seu punho é canelado permitindo mais firmeza na utilização. Não perca mais tempo, sinta a qualidade Nike e compre já o seu kit!",
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