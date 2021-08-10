import { CnpjUtils } from '@utils/cnpj-utils';
import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator  } from '@angular/forms';

@Directive({
  selector: '[appCnpjValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: CnpjValidatorDirective, multi: true }
  ]
})
export class CnpjValidatorDirective implements Validator {

  private cnpjUtils: CnpjUtils;

  constructor() {
    this.cnpjUtils = new CnpjUtils();
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    if(control && control.value){
      const value = control.value.replace(/\D/g, '');
      return !this.cnpjUtils.isValid(value) ? { cnpjInvalid: true } : null;
    }
  }
}
