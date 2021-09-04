import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dniToNumber'
})
export class DniToNumberPipe implements PipeTransform {

  transform(dni: string): number {
    return Number(dni.split('.').join('').split('-').join('').slice(0, -1));
  }

}
