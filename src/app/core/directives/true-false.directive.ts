import { Directive, OnInit, ElementRef, OnChanges, SimpleChanges, Input } from '@angular/core';

import { parse, isValid, format } from 'date-fns';
import { enGB } from 'date-fns/locale';

@Directive({
  selector: '[trueFalseDirective]',
})
export class TrueFalseDirective implements OnInit {


  private el: HTMLInputElement;
  @Input() public inputDate: any;


  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    if (this.el.value) {
      const data = new Date(this.el.value);
      this.el.value = this.el.value ? 'ATIVO' : 'INATIVO'
    }
  }

}
