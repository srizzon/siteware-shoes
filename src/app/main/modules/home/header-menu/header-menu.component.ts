import { MenuService } from '@services/outros/menu.service';
import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';

import { menuConfig, MenuConfig } from '@constants/menu.constants';
@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {

  currentRotatedCard: [number, number] = [-1, -1];
  menus: MenuConfig[];

  @ViewChildren('firstRow') cards0: QueryList<ElementRef>;
  @ViewChildren('secondRow') cards1: QueryList<ElementRef>;

  constructor(
    private renderer: Renderer2,
    private _menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.menus = this._menuService.getMenu();
  }

  onMenuClick(cardIndex: number, rowIndex: number): void {
    const previeusRotatedCard = this.currentRotatedCard;
    this.checkAndremoveCurrentCardRotation();
    if (cardIndex !== previeusRotatedCard[0] || rowIndex !== previeusRotatedCard[1]) {
      this.rotateCard(cardIndex, rowIndex, 'rotateY(180deg)');
      this.currentRotatedCard = [cardIndex, rowIndex];
    }
  }

  checkAndremoveCurrentCardRotation(): void {
    if (this.currentRotatedCard[0] !== -1) {
      this.rotateCard(this.currentRotatedCard[0], this.currentRotatedCard[1], 'rotateY(0deg)');
      this.currentRotatedCard = [-1, -1];
    }
  }

  rotateCard(cardIndex: number, rowIndex: number, rotate: string): void {
    if (rowIndex === 0) {
      this.renderer.setStyle(this.cards0.toArray()[cardIndex].nativeElement, 'transform', rotate);
    } else {
      this.renderer.setStyle(this.cards1.toArray()[cardIndex].nativeElement, 'transform', rotate);
    }
  }
}
