import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dateToFront'})
export class DateToFront implements PipeTransform {
  transform(value: any): string {
    const dateVal = new Date(value);
    var dia = String(dateVal.getDate()).padStart(2, '0');
    var mes = String(dateVal.getMonth() + 1).padStart(2, '0'); //January is 0!
    var ano = dateVal.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
}
