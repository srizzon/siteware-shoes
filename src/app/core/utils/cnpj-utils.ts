import { CNPJ_BLACKLIST, CNPJ_INDEX_VALIDATE_DIGIT, CNPJ_QTD_DIGITS, CNPJ_DIGITS_VALIDATOR } from '@constants/cnpj.constants';

export class CnpjUtils {

  isValid(value): boolean {
    if (!value || value.length !== CNPJ_QTD_DIGITS || CNPJ_BLACKLIST.indexOf(value) >= 0) { return false; }

    let numbers = value.substr(0, CNPJ_QTD_DIGITS - CNPJ_DIGITS_VALIDATOR);
    numbers += this.validateDigit(numbers);
    numbers += this.validateDigit(numbers);

    return numbers.substr(- CNPJ_DIGITS_VALIDATOR) === value.substr(- CNPJ_DIGITS_VALIDATOR);
  }

  private validateDigit(value): number {
    let index = CNPJ_INDEX_VALIDATE_DIGIT;
    const reverse = value.split('').reduce((buffer, digit) => {
      return [parseInt(digit, 10)].concat(buffer);
    }, []);

    const sum = reverse.reduce((buffer, digit) => {
      buffer += digit * index;
      index = (index === 9) ? 2 : index + 1;
      return buffer;
    }, 0);
    const mod = sum % 11;
    return mod < 2 ? 0 : (11 - mod);
  }

}
