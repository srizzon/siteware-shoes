import { UserLoginModel } from '@models/outros/user-login.model';
import { menuConfig, MenuConfig } from '@constants/menu.constants';
import { UserControllerService } from './user-controller.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private _user: UserControllerService
  ) { }

  getMenu(): MenuConfig[] {
    let menu: MenuConfig[] = menuConfig;
    let user: UserLoginModel = this._user.getUserLogged();

    if (!this._user.isAssociado()) {
      menu = menu.filter(x => !x.onlyAssociated && !x.disabled)
      menu.forEach(element => {
        element.submenus = element.submenus.filter(x => !x.onlyAssociated && !x.disabled);
      });
    } else {
      menu = menu.filter(x => x.profilesToShowItems.includes(user.type) && !x.disabled);
      menu.forEach(element => {
        let submenu = [];
        element.submenus.map(y => {
          if (y.profilesToShowItems.includes(user.type) && !y.disabled) {
            submenu.push(y)
          }
        })
        element.submenus = submenu;
      });
    }
    return menu;
  }
}
