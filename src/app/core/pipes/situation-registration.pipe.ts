import { Pipe, PipeTransform } from '@angular/core';

const situations = {
  P: 'PRÉ MATRICULADO',
  C: 'CANCELADO',
  M: 'MATRICULADO',
};

@Pipe({name: 'situationRegistration'})
export class SituationRegistrationPipe implements PipeTransform {
  transform(value: string): string {
    return situations[value];
  }
}
