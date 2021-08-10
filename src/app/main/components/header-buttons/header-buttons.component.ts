import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';

import { ButtonsMenuModel } from '@models/outros/buttons-menu.model';
import { ButtonsMenuEventsEnum } from '@enums/buttons-menu-events.enum';

@Component({
  selector: 'app-header-buttons',
  templateUrl: './header-buttons.component.html',
  styleUrls: ['./header-buttons.component.scss']
})
export class HeaderButtonsComponent implements OnInit, OnChanges {

  /**
  * @description Objeto com os tipos de botões que deve conter no cabeçalho.
 */
  @Input() buttons: ButtonsMenuModel = new ButtonsMenuModel();

  /**
   * @description Objeto que é utilizado para preenchimento no form. É o MODEL do objeto da pagina.
   */
  @Input() object: any = null;

  /**
   * @description Parametro que faz o controle de ativar/desativar botões.
   */
  @Input() disabled: boolean = null;

  /**
   * @description Parametro que faz o controle do botão habilitar/desabilitar. Passar o nome do parâmetro do status de ativo/inativo.
   */
  @Input() active: any = null;

  /**
   * @description Esse parâmetro é o status do formulário form.valid
   */
  @Input() valid: boolean = null;

  /**
   * @description Parametro para desabilitar o texto do header
   */
  @Input() enableHeader: boolean = true;

  /**
   * @description Ação de retorno do clique em algum dos botões.
   */
  @Output() buttonsEmmiter: EventEmitter<ButtonsMenuEventsEnum> = new EventEmitter<ButtonsMenuEventsEnum>();

  events = ButtonsMenuEventsEnum;

  constructor(
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.object && changes.object.currentValue) {
      this.object = changes.object.currentValue;
    }
    this._cdr.detectChanges();
  }
}
