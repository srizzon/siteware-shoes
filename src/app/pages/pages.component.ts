import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

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

  constructor(private sidebarService: NbSidebarService) { }

  ngOnInit(): void {
  }

}
