import { Component, ElementRef, OnInit, Renderer2, ViewChild, AfterViewInit } from '@angular/core';

import { MenuConfig } from '@constants/menu.constants';
import { MenuService } from '@services/outros/menu.service';
import { UserLoginModel } from '@models/outros/user-login.model';
import { UserControllerService } from '@services/outros/user-controller.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  user: UserLoginModel;

  @ViewChild('menu') menu: ElementRef;
  @ViewChild('menuBox') menuBox: ElementRef;

  menuItems: MenuConfig[];

  constructor(
    private _userService: UserControllerService,
    private _renderer: Renderer2,
    private _menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.user = this._userService.getUserLogged();
    this.menuItems = this._menuService.getMenu();
  }

  ngAfterViewInit(): void {
    const el = this.menuBox.nativeElement.offsetHeight;
    this._renderer.setStyle(this.menuBox.nativeElement, 'height', `${el}px`);
  }

  openMenu(): void {
    this._renderer.setStyle(this.menu.nativeElement, 'top', 0);
  }

  closeMenu(element?): void {
    if (!element) {
      this._renderer.setStyle(this.menu.nativeElement, 'top', '-100vh');
    } else if (element.target && element.target.id !== 'menu') {
      return
    }
    this._renderer.setStyle(this.menu.nativeElement, 'top', '-100vh');
  }

  logout(): void {
    this._userService.logout();
  }
}
