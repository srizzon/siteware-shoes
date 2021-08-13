import { DiscountTypeEnum } from "src/app/shared/models/discount-type.enum";
import { Product } from "src/app/shared/models/product.model";

export const PRODUCTS: Product[] = [
    {
        "id": 1,
        "title": "Tênis Nike Revolution 5 - Feminino",
        "images": [
            "https://static.netshoes.com.br/produtos/tenis-nike-revolution-5-feminino/26/HZM-1729-026/HZM-1729-026_zoom1.jpg?ts=1569489067&",
            "https://static.netshoes.com.br/produtos/tenis-nike-revolution-5-feminino/26/HZM-1729-026/HZM-1729-026_zoom2.jpg?ts=1569489067&",
            "https://static.netshoes.com.br/produtos/tenis-nike-revolution-5-feminino/26/HZM-1729-026/HZM-1729-026_zoom4.jpg?ts=1569489067&"
        ],
        "description": "Para a mulher que curte correr em grande estilo, aposte no Tênis Nike Revolution 5! Confeccionado em material leve e sem costura, permitindo maior conforto, sem atritos na hora da corrida. Conta com reforço no calcanhar para proteção contra possíveis torções, fechamento dinâmico, com mais ilhós para ajuste personalizado e borracha em ponto estratégicos no solado, para reduzir o desgaste durante a corrida. Esse tênis feminino foi desenvolvido para a mulher que busca conforto enquanto desafia seus limites na velocidade, não perca essa oportunidade aqui na Netshoes!",
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
        "title": "Tênis Nike Downshifter 11 Feminino",
        "images": [
            'https://static.netshoes.com.br/produtos/tenis-nike-downshifter-11-feminino/26/HZM-5209-026/HZM-5209-026_zoom1.jpg?ts=1620698810&',
            'https://static.netshoes.com.br/produtos/tenis-nike-downshifter-11-feminino/26/HZM-5209-026/HZM-5209-026_zoom2.jpg?ts=1620698810&',
            'https://static.netshoes.com.br/produtos/tenis-nike-downshifter-11-feminino/26/HZM-5209-026/HZM-5209-026_zoom3.jpg?ts=1620698810&'
        ],
        "description": "Para caminhadas e corridas leves na esteira ou nas ruas, aposte no conforto e qualidade do Tênis Nike Feminino para completar seu visual esportivo e treinar em busca do corpo saudável. Com um cabedal produzido em malha macia e respirável, o modelo possui tiras sintéticas que, junto ao calcanhar, garantem conforto e suporte para você ir mais longe. A entressola alta e fabricada em EVA proporciona amortecimento leve e deixa a passada mais suave. Já o solado emborrachado é aderente a diferentes tipos de piso, oferecendo segurança para você ultrapassar seus limites e ir cada vez mais longe. Se você é iniciante na corrida e está procurando por um tênis que faça a diferença, o novo Nike Downshifter 11 é a escolha certa. Aproveite!",
        "categories": [
            "shoes"
        ],
        "price": 329.99,
        "discount": 110,
        "discountType": DiscountTypeEnum.VALUE,
        "finalPrice": 219.99,
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
            38,
            39,
            40
        ]
    },
    {
        "id": 3,
        "title": "Tênis Adidas Coreracer Feminino",
        "images": [
            "https://static.netshoes.com.br/produtos/tenis-adidas-coreracer-feminino/96/NQQ-4636-296/NQQ-4636-296_zoom1.jpg?ts=1616427402&",
            "https://static.netshoes.com.br/produtos/tenis-adidas-coreracer-feminino/96/NQQ-4636-296/NQQ-4636-296_zoom2.jpg?ts=1616427402&",
            "https://static.netshoes.com.br/produtos/tenis-adidas-coreracer-feminino/96/NQQ-4636-296/NQQ-4636-296_zoom5.jpg?ts=1616427402&"
        ],
        "description": "Se você é iniciante na corrida e está buscando um tênis adequado para o seu treino, o novo Adidas Corerace é o que você estava procurando. Com um cabedal confeccionado com material têxtil, a parte de cima do calçado conta também com tramas em mesh que garantem circulação de ar e ótima respirabilidade entre uma passada e outra. A entressola em EVA e o solado de borracha de alta qualidade garantem amortecimento leve e ótima tração. Com um design moderno, o Tênis Adidas Feminino é opção para o treino na esteira, na rua ou, até mesmo, para usar de forma casual. Aproveite a oportunidade e garanta já o seu.",
        "categories": [
            "shoes"
        ],
        "price": 79.99,
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
    {
        "id": 7,
        "title": "Bermuda Nike Monster Mesh 5.0 Masculina",
        "images": [
            "https://static.netshoes.com.br/produtos/bermuda-nike-monster-mesh-50-masculina/26/HZM-3990-026/HZM-3990-026_zoom1.jpg?ts=1592995037&",
            "https://static.netshoes.com.br/produtos/bermuda-nike-monster-mesh-50-masculina/26/HZM-3990-026/HZM-3990-026_zoom2.jpg?ts=1592995037&",
            "https://static.netshoes.com.br/produtos/bermuda-nike-monster-mesh-50-masculina/26/HZM-3990-026/HZM-3990-026_zoom3.jpg?ts=1592995037&"
        ],
        "description": "Treine pesado se sentindo mais fresco com a Bermuda Masculina Nike Monster Mesh 5.0! Composta por tecido leve e altamente ventilado, a bermuda de academia conta com cós elástico de toque macio na pele, bolsos frontais e tecido Dri-Fit que ajusta a afastar o suor da pele para te manter no foco durante as séries.",
        "categories": [
            "socks"
        ],
        "price": 79.99,
        "promotions": [
            {
                "id": 1,
                "title": "Leve 2 e pague 1",
                "status": "danger",
                "description": "Na compra 2 produtos iguais pague por apenas 1"
            }
        ]
    },

]