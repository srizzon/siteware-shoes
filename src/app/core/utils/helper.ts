import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/pt-br';
export class Helper {

  public static dateDiff(dtInit: Date, dtFinal: Date, returnType: string = 'days') {
    const diff = dtFinal.getTime() - dtInit.getTime();
    // tslint:disable-next-line:max-line-length
    if (returnType === 'seconds') { return Math.floor(diff / 1000); }
    else if (returnType === 'minutes') { return Math.floor(diff / 60000); }
    else if (returnType === 'hours') { return Math.floor(diff / 3600000); }
    else if (returnType === 'days') { return Math.floor(diff / 86400000); }
    else if (returnType === 'months') { return Math.floor(diff / 2419200000); }
    else { return new Date(diff); }
  }

  /**
   * @description Change itens to uppercase by specific field
   * @param arrayItems
   * @param field
   */
  public static changeToUpercase(arrayItems: any[], field: string): any[] {
    arrayItems.map(x => {
      x[field] = x[field].toUpperCase()
    });
    return arrayItems
  }

  /**
   * @description Sort array by specific field
   * @param arrayItems
   * @param paramToOrder
   */
  public static sortItems(arrayItems: any[], paramToOrder: string) {
    arrayItems.sort(function (a, b) {
      if (a[paramToOrder] > b[paramToOrder]) {
        return 1;
      }
      if (a[paramToOrder] < b[paramToOrder]) {
        return -1;
      }
      return 0;
    });
    return arrayItems;
  }

  /**
 * @description Sort array
 * @param arrayItems
 */
  public static sortArray(arrayItems: any[]) {
    arrayItems.sort(function (a, b) {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    });
    return arrayItems;
  }

  /**
   * @description Get days of week to block calendar
   * @param date
   */
  public static daysOfWeek = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  public static imageToBack(image) {
    return image.replace(/^data:image\/[a-z]+;base64,/, "");
  }

  public static imageToFront(image) {
    return 'data:image/png;base64,' + image;
  }

  public static downloadBlobFile(name, file): void {
    let url = window.URL.createObjectURL(file);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  public static capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  /**
   *
   * @param date format(DD/MM/YYYY)
   * @param time format(hh:mm:ss)
   * @returns
   */
  public static formatDateUtc(date, time) {
    let data = date;
    if (date.indexOf('/') <= 0) {
      data = moment(date).format('DD/MM/YYYY');
    }
    const dataSplit = data.split('/');
    let mes = Number(dataSplit[1]);
    mes--;
    const dataAtual = moment(new Date(Number(dataSplit[2]), mes, Number(dataSplit[0]))).format('YYYY-MM-DD');
    const dateComplete = moment.utc(`${dataAtual} ${time}`).format();
    return dateComplete;
  }

  public static checkUrlBack(activatedRoute: ActivatedRoute) {
    return activatedRoute.snapshot.url[0].path == 'adicionar' ? '../' : '../../';
  }

  public static generateNameReport(name, filter) {
    if (filter && Object.keys(filter).length > 0) {
      Object.keys(filter).map(x => name += ` - ${x} ${filter[x]}`)
    }
    return name;
  }
}

