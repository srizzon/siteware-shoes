import { Cpf } from './../enums/cpf.enum';

export class CpfUtils {

    private readonly cpfBlackList: Array<string> = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
        '12345678909'
    ];

    isValid(value): boolean {

        if (!value || value.length !== Cpf.CPF_QTD_DIGITS || this.cpfBlackList.indexOf(value) >= 0) { return false; }

        let numbers = value.substr(0, 9);
        numbers += this.validateDigit(numbers);
        numbers += this.validateDigit(numbers);

        return numbers.substr(-Cpf.CPF_QTD_DIGITS_VALIDATOR) === value.substr(-Cpf.CPF_QTD_DIGITS_VALIDATOR);
    }

    private validateDigit(cpf): number {
        cpf = cpf.split('').map((digit) => parseInt(digit, 10));

        const modulus = cpf.length + 1;

        const multiplied = cpf.map((value, index ) => value * (modulus - index) );
        const mod = multiplied.reduce((buffer, value) => buffer + value) % Cpf.CPF_QTD_DIGITS;
        return ( (mod < 2) ? 0 : (11 - mod) );
    }
}
