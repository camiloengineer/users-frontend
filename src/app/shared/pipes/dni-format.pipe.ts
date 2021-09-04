import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dniFormat',
})
export class DniFormatPipe implements PipeTransform {


  transform(dniClean: number = 0): string {
    let dni = dniClean.toString() + this.getDV(dniClean.toString());
    
    if (dni.length <= 1) {
        return dni;
    }
    var result = dni.slice(-4, -1) + "-" + dni.substr(dni.length - 1);
    for (var i = 4; i < dni.length; i += 3) {
        result = dni.slice(-3 - i, -i) + "." + result;
    }
    return result;
  }

  getDV(dni: string) {
    if (!dni || !dni.length || typeof dni !== 'string') {
      return -1;
    }
    var sequence = [2,3,4,5,6,7,2,3];
    var sum = 0;
    //
    for (var i=dni.length - 1; i >=0; i--) {
      var d = dni.charAt(i)
      sum +=  Number(d)*sequence[dni.length - (i + 1)];
    };
    var rest = 11 - (sum % 11);
    return rest === 11 ? 0 : rest === 10 ? "K" : rest;
  }

}
