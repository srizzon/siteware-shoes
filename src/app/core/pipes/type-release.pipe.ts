import { Pipe, PipeTransform } from '@angular/core';
import { TypeRelease } from '@core/enums/type-release.enum';

@Pipe({name: 'typerelease'})
export class TypeReleasePipe implements PipeTransform {
  transform(value: string): string {
    return TypeRelease[value];
  }
}
