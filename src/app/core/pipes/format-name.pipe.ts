import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatName'})
export class FormatName implements PipeTransform {
  transform(value: string): string {
    var name = value.split(' ');
    var firstName = name[0];
    var lastName = name[name.length - 1]; 
    return `${firstName} ${lastName}`;
  }
}
