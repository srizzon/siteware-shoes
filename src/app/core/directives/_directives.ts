import { DateDirective } from './date.directive';
import { OnlyLetterDirective } from './only-letter/only-letter.directive';
import { CnpjValidatorDirective } from './cnpj-validator.directive';
import { ControlErrorContainerDirective } from './control-error/control-error-container.directive';
import { ControlErrorsDirective } from './control-error/control-errors.directive';
import { CpfValidatorDirective } from './cpf-validator.directive';
import { CellPhoneValidatorDirective } from './cell-phone-validator.directive';
import { FormSubmitDirective } from './control-error/form-submit.directive';
import { TrueFalseDirective } from './true-false.directive';

export const Directives = [
  CellPhoneValidatorDirective,
  CpfValidatorDirective,
  ControlErrorsDirective,
  FormSubmitDirective,
  ControlErrorContainerDirective,
  CnpjValidatorDirective,
  DateDirective,
  OnlyLetterDirective,
  TrueFalseDirective
]
