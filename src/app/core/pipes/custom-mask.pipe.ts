import { DefaultMasks } from '@enums/default-masks.enum';
import { PipeTransform, Pipe } from '@angular/core';
import { MaskPipe } from 'ngx-mask';


@Pipe({
	name: 'customMask'
})
export class CustomMaskPipe implements PipeTransform {
	constructor(private pipeMask: MaskPipe) { }

	transform(value: string | number, ...args: any[]): number | string {
		switch (args[0]) {
			case 'CpfCnpj':
				return this.formatCpfCnpj(value.toString());

			case 'percentual':
				return this.formatPercentualValue(value);

			case 'percentual-inteiro':
				return this.formatPercentualInteiroValue(value);

			case 'pontuacao-unitaria':
				return this.formatPontuacaoNumerica(value);

			default:
				return value;
		}
	}

	private formatCpfCnpj(value: string): string {

		if (value.length < 11) {
			value = value.padStart(11, '0');
		}
		if (value.length > 11 && value.length < 14) {
			value = `00${value}`;
		}

		return this.pipeMask.transform(
			value,
			value.length > 11 ? DefaultMasks.CNPJ : DefaultMasks.CPF)
	}



	private formatPercentualValue(value: any): any {
		return value * 100;
	}

	private formatPercentualInteiroValue(value: any) {
		const valor = this.formatPercentualValue(value);
		return Math.trunc(valor);
	}

	private formatPontuacaoNumerica(value: any) {
		return value.toLocaleString();
	}
}
