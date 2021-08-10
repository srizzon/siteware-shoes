import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'dateAndTime'})
export class DateAndTimePipe implements PipeTransform {
  transform(value: any): string {
    const time = moment(value).format('DD/MM/YYYY HH:mm')
    return time;
  }
}


