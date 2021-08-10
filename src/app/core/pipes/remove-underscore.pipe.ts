import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'removeUnderscore'})
export class RemoveUnderscorePipe implements PipeTransform {
  transform(value: string): string {
    let newValue = value.split('_');
    let valueFormated = newValue.join(' ');
    return valueFormated;
  }
}
