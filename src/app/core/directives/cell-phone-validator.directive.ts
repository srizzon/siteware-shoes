import { CellPhone } from '@enums/cellphone.enum';
import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator  } from '@angular/forms';

@Directive({
  selector: '[appCellPhoneValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: CellPhoneValidatorDirective, multi: true }
  ]
})
export class CellPhoneValidatorDirective implements Validator {

  constructor() {  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    if(control && control.value){
      const value = control.value.replace(/\D/g, '');
      return value.length < CellPhone.CELL_PHONE_QTD_DIGITS ? { cellPhoneInvalid: true } : null;
    }
  }
}
