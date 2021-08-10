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
      title: 'Home',
      icon: 'home-outline',
      link: '/home',
      home: true,
    },
    {
      title: 'Produtos',
      icon: 'shopping-cart-outline',
      children: [
        {
          title: 'Calçados',
          link: '/pages/forms/inputs',
        },
        {
          title: 'Meias',
          link: '/pages/forms/layouts',
        },
      ]
    },
    {
      title: 'CRUD',
      icon: 'edit-outline',
      link: '/crud'
    },
  ];

}
