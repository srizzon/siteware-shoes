

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'turn'})
export class TurnPipe implements PipeTransform {
  transform(value: string): string {
    return value === 'MANHA' ? 'Manhã' : value == 'TARDE' ? 'Tarde' : value == 'NOITE' ? 'Noite' : value == 'TODOS' ? 'Todos' : '-';
  }
}
