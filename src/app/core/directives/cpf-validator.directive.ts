import { CpfUtils } from '@utils/cpf-utils';
import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator  } from '@angular/forms';

@Directive({
  selector: '[appCpfValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: CpfValidatorDirective, multi: true }
  ]
})
export class CpfValidatorDirective implements Validator {

  private cpfUtils: CpfUtils;

  constructor() {
    this.cpfUtils = new CpfUtils();
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    if(control && control.value){
      const value = control.value.replace(/\D/g, '');
      return !this.cpfUtils.isValid(value) ? { cpfInvalid: true } : null;
    }
  }

}
