import { Pipe, PipeTransform } from '@angular/core';
import { SituationContractEnum } from '@core/enums/situation-contract.enum';
import { FinancialContractStatus } from '../../core/enums/financial-contract-status.enum';

@Pipe({name: 'situationPipe'})
export class SituationPipe implements PipeTransform {
  transform(value: FinancialContractStatus): string {
    return SituationContractEnum[value];
  }
}
