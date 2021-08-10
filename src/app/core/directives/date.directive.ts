import { Directive, OnInit, ElementRef, OnChanges, SimpleChanges, Input } from '@angular/core';

import { parse, isValid, format } from 'date-fns';
import { enGB } from 'date-fns/locale';

@Directive({
  selector: '[dateDirective]',
})
export class DateDirective implements OnInit, OnChanges {


  private el: HTMLInputElement;
  @Input() public inputDate: any;


  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    const parsedDate = parse('29/10/1989', 'P', new Date(), { locale: enGB });
    const isValidDate = isValid(parsedDate);
    const formattedDate = format(parsedDate, 'dd-MM-yyyy');

    if (this.el.value) {
      const data = new Date(this.el.value);
      this.el.value = format(data, 'dd/MM/yyyy');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.inputDate && changes.inputDate.currentValue) {
      this.el.value = format(new Date(changes.inputDate.currentValue), 'dd/MM/yyyy');
    }
  }
}
