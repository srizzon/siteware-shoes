import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent {

  menu: NbMenuItem[] = [
    {
      title: 'Inicio',
      icon: 'home-outline',
      link: '/products',
      home: true,
    },
    {
      title: 'Produtos',
      icon: 'shopping-cart-outline',
      children: [
        {
          title: 'Calçados',
          link: '/products',
          queryParams: {category: 'shoes'}
        },
        {
          title: 'Meias',
          link: '/products',
          queryParams: {category: 'socks'}
        },
        {
          title: 'Roupas',
          link: '/products',
          queryParams: {category: 'clothes'}
        },
        {
          title: 'Outros',
          link: '/products',
          queryParams: {category: 'others'}
        },
      ]
    },
    {
      title: 'Admin',
      icon: 'options-2-outline',
      link: '/admin'
    },
  ];

}
