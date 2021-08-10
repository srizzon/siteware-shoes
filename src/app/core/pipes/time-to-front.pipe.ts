import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'timeToFront'})
export class TimeToFrontPipe implements PipeTransform {
  transform(value: any): string {
    const time = moment(value).format('HH:mm')
    return time;
  }
}
